import {Server} from "socket.io";
import * as Koa from "koa";
import router from './routers'
import * as KoaBody from "koa-body";
import useHandleError from "./middleware/errorHandler";
import {setup} from "./ws";

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
});

setup(io);

const app = new Koa();

app
  .use(KoaBody())
  .use(useHandleError())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3011);

export default io;