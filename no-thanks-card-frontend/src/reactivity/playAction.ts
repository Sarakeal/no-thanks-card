import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {playerAct} from "@/http/action";


export async function act(action: Action) {
  await playerAct({
    action: action,
  })
}