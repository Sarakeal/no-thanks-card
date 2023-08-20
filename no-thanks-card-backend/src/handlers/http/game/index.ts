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
      player.money--;
      room.cards.getNextCard();
      room.currentPlayer = room.getNextPlayer();
      this.start(room);
    } else {
      room.currentPlayer = room.getNextPlayer();
      this.start(room);
    }

    return {
      status: 200,
      msg: "ok",
      data: {  },
    };
  },

  start(room: Room) {
    const timeout = 5;
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      room.currentPlayer = room.getNextPlayer();

      if (room.cards.isFinished()) {
        this.end(room);
      } else {
        room.cards.getNextCard();
        this.start(room);
      }
    }, timeout * 1000);

    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      timeout,
      player: room.currentPlayer,
      card: room.cards.currentCard,
      players: room.getPlayers(),
    } as ChangeStatusMsg);
  },

  end(room: Room) {
    const winner = room.getPlayers()[0]; // FIXME
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

  constructor() {
    this.cards = [];
    for (let i = Cards.min; i <= Cards.max; i++) {
      this.cards.push(i);
    }
    this.shuffle();
    this.currentCard = this.cards[this.index];
  }

  getNextCard() {
    const card = this.cards[this.index];
    this.index++;

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