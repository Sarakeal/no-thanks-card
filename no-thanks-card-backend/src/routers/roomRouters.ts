import * as Router from "koa-router";

import roomCreate from "../handlers/http/roomCreate";
import roomInit from "../handlers/http/roomInit";
import roomJoin from "../handlers/http/roomJoin";

const roomRouter = new Router();

roomRouter.post("room create", "/create", roomCreate);
roomRouter.post("room init", "/init", roomInit);
roomRouter.post("room join", "/join", roomJoin);

export default roomRouter;
