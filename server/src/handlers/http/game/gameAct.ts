import { Middleware } from "koa";
import io from "../../../index";
import {Events} from "../../../../../client/shared/WSEvents";
import {RoomNumberHeaderName, IDHeaderName} from "../../../../../client/shared/constants";
import {PlayerActRequest} from "../../../../../client/shared/httpMsg/PlayerActMsg";
import {GameHandler} from "./index"
import {Room} from "../../../models/RoomModel";

/**
 * handle game act
 */
const gameAct: Middleware = async (ctx) => {
  const req = ctx.request.body as PlayerActRequest;

  const roomNumber = ctx.get(RoomNumberHeaderName);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(req.playerId);

  ctx.body = await GameHandler.handleHttp(room, player, req.action);
};

export default gameAct;
