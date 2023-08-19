import * as Router from "koa-router";

import gameBegin from "../handlers/http/gameBegin";

const gameRouter = new Router();

gameRouter.post("game begin", "/begin", gameBegin);

export default gameRouter;
