import {Server} from "socket.io";
import * as Koa from "koa";
import router from './routers'
import * as KoaBody from "koa-body";

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello from server", 1, "2", {3: Buffer.from([4])});

    // receive a message from the client
    socket.on("hello from client", (...args) => {
        // ...
        console.log(args)
    });
});

const app = new Koa();

app
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3011);