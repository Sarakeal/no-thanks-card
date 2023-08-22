import { Middleware } from "koa";
import io from "../../../index";
import {Events} from "../../../../../client/shared/WSEvents";
import {RoomNumberHeaderName} from "../../../../../client/shared/constants";
import {HttpRes} from "../../../../../client/shared/httpMsg/_httpResTemplate";
import {GameHandler} from "./index"
import {Room} from "../../../models/RoomModel";
import {createError} from "../../../middleware/errorHandler";

/**
 * handle game begin
 */
const gameBegin: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);

  const room = Room.getRoom(roomNumber);

  if (room.players.length < 3) {
    createError({
      status: 401,
      msg: "房间人数不足，无法开始游戏",
    })
  }

  io.to(roomNumber).emit(Events.GAME_BEGIN);

  GameHandler.start(room);

  ctx.body = {
    data: {},
    msg: "ok",
    status: 200,
  } as HttpRes;
};

export default gameBegin;
