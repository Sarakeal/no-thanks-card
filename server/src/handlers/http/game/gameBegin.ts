import { Middleware } from "koa";
import io from "../../../index";
import {Events} from "../../../../../client/shared/WSEvents";
import {RoomNumberHeaderName} from "../../../../../client/shared/constants";
import {HttpRes} from "../../../../../client/shared/httpMsg/_httpResTemplate";
import {GameHandler} from "./index"
import {Room} from "../../../models/RoomModel";

/**
 * handle game begin
 */
const gameBegin: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);

  io.to(roomNumber).emit(Events.GAME_BEGIN);

  const room = Room.getRoom(roomNumber);
  GameHandler.start(room);

  ctx.body = {
    data: {},
    msg: "ok",
    status: 200,
  } as HttpRes;
};

export default gameBegin;
