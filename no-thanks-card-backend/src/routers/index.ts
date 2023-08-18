import * as Router from "koa-router";

import roomRouter from "./roomRouters";

const router = new Router();

router
    .use("/room", roomRouter.routes(), roomRouter.allowedMethods());

export default router;
