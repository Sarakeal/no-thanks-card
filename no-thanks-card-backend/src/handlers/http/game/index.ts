import {Room} from "../../../models/RoomModel";
import io from "../../../index";
import {Events} from "../../../../../no-thanks-card-frontend/shared/WSEvents";
import {ChangeStatusMsg} from "../../../../../no-thanks-card-frontend/shared/wsMsg/ChangeStatus";
import {GameEndMsg} from "../../../../../no-thanks-card-frontend/shared/wsMsg/GameEnd";


const CLEAR_ROOM_TIME = 3600 * 1000;

export interface IGameHandler {
  start: (room: Room) => void;

  end: (room: Room) => void;
}

export const GameHandler: IGameHandler = {

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