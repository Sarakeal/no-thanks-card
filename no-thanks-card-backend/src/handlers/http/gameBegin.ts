import { Middleware } from "koa";
import io from "../../index";
import {Events} from "../../../../no-thanks-card-frontend/shared/WSEvents";
import {RoomNumberHeaderName} from "../../../../no-thanks-card-frontend/shared/constants";
import {HttpRes} from "../../../../no-thanks-card-frontend/shared/httpMsg/_httpResTemplate";


/**
 * handle game begin
 */
const gameBegin: Middleware = async (ctx) => {
  const roomNumber = ctx.get(RoomNumberHeaderName);

  io.to(roomNumber).emit(Events.GAME_BEGIN);

  ctx.body = {
    data: {},
    msg: "ok",
    status: 200,
  } as HttpRes;
};

export default gameBegin;
