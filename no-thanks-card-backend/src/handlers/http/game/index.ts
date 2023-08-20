import {Room} from "../../../models/RoomModel";
import io from "../../../index";
import {Events} from "../../../../../no-thanks-card-frontend/shared/WSEvents";
import {ChangeStatusMsg} from "../../../../../no-thanks-card-frontend/shared/wsMsg/ChangeStatus";

export interface IGameHandler {
  start: (room: Room) => void;
}

export const GameHandler: IGameHandler = {

  start(room: Room) {
    const timeout = 5;
    clearTimeout(room.timer);
    room.timer = setTimeout(() => {
      room.currentPlayer = room.getNextPlayer();
      this.start(room);
    }, timeout * 1000);

    io.to(room.roomNumber).emit(Events.CHANGE_STATUS, {
      timeout,
      player: room.currentPlayer,
    } as ChangeStatusMsg);
  }
}