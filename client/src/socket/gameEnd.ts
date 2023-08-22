import { socket } from "./";
import {GameEndMsg} from "../../shared/wsMsg/GameEnd";

export default function gameEnd(msg: GameEndMsg) {
  socket.removeAllListeners();
  socket.disconnect();

  console.log('Game end');
  console.log('Winner: ' + msg.winner);
}