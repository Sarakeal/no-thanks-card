import { Middleware } from "koa";

import {
    CreateRoomRequest, CreateRoomResponse
} from "../../../../client/shared/httpMsg/CreateRoomMsg";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";

const roomCreate: Middleware = async (ctx, next) => {
  const req = ctx.request.body as CreateRoomRequest;
  const { name, password } = req;

  const creator = new Player(name, 0);

  const room = new Room({creator, password});

  const res: CreateRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      roomNumber: room.roomNumber,
      ID: creator._id,
      player: creator,
    },
  };

  ctx.body = res;
};

export default roomCreate;
