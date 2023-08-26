import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {playerAct} from "@/http/action";
import {selfPlayer} from "@/reactivity/game";


export async function act(action: Action) {
  await playerAct({
    action: action,
    playerId: selfPlayer.value.id,
  })
}