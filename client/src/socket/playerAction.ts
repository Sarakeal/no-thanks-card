import {playerAction} from "@/reactivity/game";
import {ActionMsg} from "../../shared/wsMsg/Action";

export default function playerActed(msg: ActionMsg) {
  playerAction.value = msg;
}