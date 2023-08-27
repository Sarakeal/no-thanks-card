import io from "socket.io-client";
import {Events} from "../../shared/WSEvents";
import {WS_SERVER_DOMAIN} from "../../shared/constants";
import roomJoin from "@/socket/roomJoin";
import gameBegin from "@/socket/gameBegin";
import gameEnd from "@/socket/gameEnd";
import changeStatus from "@/socket/changeStatus";
import playerActed from "@/socket/playerAction";

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
  socket.on(Events.GAME_BEGIN, gameBegin);
  socket.on(Events.GAME_END, gameEnd);
  socket.on(Events.CHANGE_STATUS, changeStatus);
  socket.on(Events.ACTION, playerActed);

  socket.emit(Events.ROOM_JOIN, roomNumber);

}

export {joinRoomSocket, socket};