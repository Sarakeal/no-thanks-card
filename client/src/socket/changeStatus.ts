import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import {gameInfo} from "@/reactivity/game";

export default function changeStatus(msg: ChangeStatusMsg) {
  gameInfo.value = msg;
}
