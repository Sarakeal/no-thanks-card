import {Middleware} from "koa";

import {JoinRoomRequest, JoinRoomResponse} from "../../../../client/shared/httpMsg/JoinRoomMsg";
import {RoomJoinMsg} from "../../../../client/shared/wsMsg/RoomJoin";
import {Events} from "../../../../client/shared/WSEvents";
import {Room} from "../../models/RoomModel";
import io from "../../index";
import {createError} from "../../middleware/errorHandler";

const PLAYER_LIMIT = 6;
const roomInit: Middleware = async (ctx, next) => {
  const req = ctx.request.body as JoinRoomRequest;
  const {name, roomNumber, password} = req;

  const room = Room.getRoom(roomNumber);

  if (room.players.length >= PLAYER_LIMIT) {
    createError({
      msg: '房间已满',
      status: 401,
    })
  }

  const player = room.joinPlayer(name, password);

  const res: JoinRoomResponse = {
    status: 200,
    msg: "ok",
    data: {
      index: player.index,
      name: player.name,
      ID: player.id,
      player: player,
    },
  };

  const roomJoinMsg: RoomJoinMsg = room.getPlayers();

  io.to(roomNumber).emit(Events.ROOM_JOIN, roomJoinMsg);

  ctx.body = res;
};

export default roomInit;
