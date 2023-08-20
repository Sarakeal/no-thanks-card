import * as Router from "koa-router";

import gameBegin from "../handlers/http/game/gameBegin";

const gameRouter = new Router();

gameRouter.post("game begin", "/begin", gameBegin);

export default gameRouter;
