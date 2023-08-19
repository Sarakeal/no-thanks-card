import io from "socket.io-client";
import {Events} from "../../shared/WSEvents";
import {WS_SERVER_DOMAIN} from "../../shared/constants";
import roomJoin from "@/socket/roomJoin";

let socket: any;

function joinRoomSocket(roomNumber: string) {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = io(WS_SERVER_DOMAIN);
  socket.on("connection", () => {
    console.log("#ws connected");
  });

  socket.on(Events.ROOM_JOIN, roomJoin);

  socket.emit(Events.ROOM_JOIN, roomNumber);

}

export {joinRoomSocket, socket};