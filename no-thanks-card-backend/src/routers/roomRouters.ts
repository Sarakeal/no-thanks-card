import * as Router from "koa-router";

import roomCreate from "../handlers/http/roomCreate";
import roomInit from "../handlers/http/roomInit";

const roomRouter = new Router();

roomRouter.post("room create", "/create", roomCreate);
roomRouter.post("room init", "/init", roomInit);

export default roomRouter;
