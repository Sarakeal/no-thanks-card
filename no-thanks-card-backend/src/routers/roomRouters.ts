import * as Router from "koa-router";

import roomCreate from "../handlers/http/roomCreate";

const roomRouter = new Router();

roomRouter.post("room create", "/create", roomCreate);

export default roomRouter;
