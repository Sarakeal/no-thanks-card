import {Room} from "../../../models/RoomModel";
import io from "../../../index";
import {Events} from "../../../../../no-thanks-card-frontend/shared/WSEvents";
import {Action} from "../../../../../no-thanks-card-frontend/shared/httpMsg/PlayerActMsg";
import {ChangeStatusMsg} from "../../../../../no-thanks-card-frontend/shared/wsMsg/ChangeStatus";
import {GameEndMsg} from "../../../../../no-thanks-card-frontend/shared/wsMsg/GameEnd";
import {Player} from "../../../models/PlayerModel";

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

    const timeout = 5;
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
    }, timeout * 1000);

    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      timeout,
      player: room.currentPlayer,
      card: room.cards.currentCard,
      players: room.getPlayers(),
      dealerMoney: room.dealerMoney,
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


function calcScore(pCards) {
  let res = []; // 双层数组
  // 如果数字能连在一起，只统计上最小的数字作为分数，比如：3，4，5，7，最终分数为3+7=10
  let cards = [...pCards];
  cards.sort();
  for (let i = 0; i < cards.length; i++) {
    let j = i;
    while (j + 1 < cards.length && cards[j + 1] === cards[j] + 1) {
      j++;
    }
    let arr = [];
    for (let k = i; k <= j; k++) {
      arr.push(cards[k]);
    }
    res.push(arr);
    j = i;
  }
  let score = 0;
  res.forEach(arr => {
    score += arr[0];
  });
  return score;
}

export class Cards {

  cards: number[];

  currentCard: number;

  static min: number = 3;

  static max: number = 35;

  index: number = 5; // 起始从5开始，也就是丢弃前5张牌

  constructor() {
    this.cards = [];
    for (let i = Cards.min; i <= Cards.max; i++) {
      this.cards.push(i);
    }
    this.shuffle();
    this.currentCard = this.cards[this.index];
  }

  next() {
    this.index++;
    const card = this.cards[this.index];

    this.currentCard = card;
    return card;
  }

  isFinished() {
    return this.index === this.cards.length;
  }

  private shuffle() {
    let n = this.cards.length;
    for (let i = 0; i < n; i++) {
      const max = n - 1;
      const min = i;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      // swap
      const temp = this.cards[i];
      this.cards[i] = this.cards[rand];
      this.cards[rand] = temp;
    }
  }

}