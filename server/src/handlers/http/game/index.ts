import {Room} from "../../../models/RoomModel";
import io from "../../../index";
import {Events} from "../../../../../client/shared/WSEvents";
import {RoomStatus} from "../../../../../client/shared/constants";
import {Action} from "../../../../../client/shared/httpMsg/PlayerActMsg";
import {ChangeStatusMsg} from "../../../../../client/shared/wsMsg/ChangeStatus";
import {GameEndMsg} from "../../../../../client/shared/wsMsg/GameEnd";
import {Player} from "../../../models/PlayerModel";
import {calcScore, shuffle} from "../../../util";

export interface Response<T = {}> {
  status: number;
  msg: string;
  data: T;
}

const CLEAR_ROOM_TIME = 3600 * 1000;

export interface IGameHandler {

  /**
   * 处理玩家发送到 http 请求(在此状态下进行的游戏操作)
   */
  handleHttp: (
    room: Room,
    player: Player,
    action: Action,
  ) => Promise<Response>;

  start: (room: Room) => void;

  end: (room: Room) => void;
}

export const GameHandler: IGameHandler = {

  async handleHttp(
    room: Room,
    player: Player,
    action: Action,
  ) {
    if (action === Action.ACCEPT) {
      player.cards.push(room.cards.currentCard);
      room.cards.next();
      player.money += room.dealerMoney;
      room.dealerMoney = 0;
    } else {
      if (player.money > 0) {
        player.money--;
        room.dealerMoney++;
        room.currentPlayer = room.getNextPlayer();
      } else {
        // 没钱只能接受
        player.cards.push(room.cards.currentCard);
        player.money += room.dealerMoney;
        room.dealerMoney = 0;
        room.cards.next();
      }
    }
    this.start(room);

    return {
      status: 200,
      msg: "ok",
      data: {  },
    };
  },

  start(room: Room) {
    if (room.cards.isFinished()) {
      this.end(room);
    }

    const timeout = 10;
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      // 此时是超时未操作的，默认不拿
      if (room.currentPlayer.money > 0) {
        room.currentPlayer.money--;
        room.dealerMoney++;
        room.currentPlayer = room.getNextPlayer();
      } else {
        // 没钱只能拿牌
        room.currentPlayer.money += room.dealerMoney;
        room.dealerMoney = 0;
        room.currentPlayer.cards.push(room.cards.currentCard);
        room.cards.next();
      }

      this.start(room);
    }, (timeout + 1) * 1000);

    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      players: room.getPlayers(),
      gameInfo: {
        boardCard: room.cards.currentCard,
        money: room.dealerMoney,
        leftCardNumber: room.cards.left,
        creatorId: room.creatorID,
        currentPlayerId: room.currentPlayer.id,
      }
    } as ChangeStatusMsg);
  },

  end(room: Room) {
    let winner = room.getPlayers()[0];
    let minScore = 9999;
    room.getPlayers().forEach(player => {
      let score = calcScore(player.cards);
      // TODO 可能有多个最小分数者
      if (score < minScore) {
        minScore = score;
        winner = player;
      }
    })
    room.status = RoomStatus.End;
    io.to(room.roomNumber).emit(Events.GAME_END, {
      winner,
    } as GameEndMsg);

    clearTimeout(room.timer);
    /* 关闭 sockets */
    // make all Socket instances leave the room
    io.socketsLeave(room.roomNumber);
    // make all Socket instances in the room disconnect (and close the low-level connection)
    io.in(room.roomNumber).disconnectSockets(true);

    setTimeout(() => {
      Room.clearRoom(room.roomNumber);
    }, CLEAR_ROOM_TIME);
  }
}

export class Cards {

  cards: number[];

  currentCard: number;

  static min: number = 3;

  static max: number = 35;

  index: number = 5; // 起始从5开始，也就是丢弃前5张牌

  left: number = 0;

  constructor() {
    this.cards = [];
    for (let i = Cards.min; i <= Cards.max; i++) {
      this.cards.push(i);
    }
    shuffle(this.cards);
    this.cards.push(0); // 填充0作为结束标志
    this.currentCard = this.cards[this.index];
    this.left = Cards.max - Cards.min + 1 - 5;
  }

  next() {
    this.index++;
    this.left--;
    const card = this.cards[this.index];

    this.currentCard = card;
    return card;
  }

  isFinished() {
    return this.index === this.cards.length;
  }

}

