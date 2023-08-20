import * as Router from "koa-router";

import gameBegin from "../handlers/http/game/gameBegin";
import gameAct from "../handlers/http/game/gameAct";

const gameRouter = new Router();

gameRouter.post("game begin", "/begin", gameBegin);
gameRouter.post("game act", "/act", gameAct); // 角色进行操作

export default gameRouter;
