import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import {currentPlayer} from "@/reactivity/game";

export default function changeStatus(msg: ChangeStatusMsg) {
  console.log(msg);
  currentPlayer.value = msg.player;
}
