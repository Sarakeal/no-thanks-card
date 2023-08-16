import { Server } from "socket.io";
import * as Koa from "koa";

const io = new Server(3000);

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

    // receive a message from the client
    socket.on("hello from client", (...args) => {
        // ...
        console.log("message from client")
    });
});

const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(3011);