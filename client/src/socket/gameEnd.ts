import { socket } from "./";
import {GameEndMsg} from "../../shared/wsMsg/GameEnd";
import {showDialog} from "@/reactivity/dialog";

export default function gameEnd(msg: GameEndMsg) {
  socket.removeAllListeners();
  socket.disconnect();

  console.log('Game end');
  setTimeout(() => {
    showDialog(`<b>游戏结束</> </br>获胜者是 ${msg.winner.name}`);
  }, 2000);
}