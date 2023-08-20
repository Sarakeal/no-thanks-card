import { socket } from "./";

export default function gameEnd() {
  socket.removeAllListeners();
  socket.disconnect();

  console.log('Game end');
}