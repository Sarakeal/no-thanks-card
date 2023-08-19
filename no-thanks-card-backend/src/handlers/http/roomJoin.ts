import { Middleware } from "koa";

import {
  JoinRoomRequest, JoinRoomResponse
} from "../../../../no-thanks-card-frontend/shared/httpMsg/JoinRoomMsg";
import {
  RoomJoinMsg
} from "../../../../no-thanks-card-frontend/shared/wsMsg/RoomJoin";
import {
  Events
} from "../../../../no-thanks-card-frontend/shared/WSEvents";
import { Room } from "../../models/RoomModel";
import io from "../../index";

const roomInit: Middleware = async (ctx, next) => {
  const req = ctx.request.body as JoinRoomRequest;
  const { name, roomNumber, password } = req;

  const room = Room.getRoom(roomNumber);

  const player = room.joinPlayer(name, password)

  const res: JoinRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      index: player.index,
      name: player.name,
    },
  };

  const roomJoinMsg: RoomJoinMsg = room.getPlayers();

  io.to(roomNumber).emit(Events.ROOM_JOIN, roomJoinMsg);

  ctx.body = res;
};

export default roomInit;
