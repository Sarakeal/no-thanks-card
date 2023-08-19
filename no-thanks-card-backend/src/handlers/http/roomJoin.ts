import { Middleware } from "koa";

import {
  JoinRoomRequest, JoinRoomResponse
} from "../../../../no-thanks-card-frontend/shared/httpMsg/JoinRoomMsg";
import { Room } from "../../models/RoomModel";

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

  ctx.body = res;
};

export default roomInit;
