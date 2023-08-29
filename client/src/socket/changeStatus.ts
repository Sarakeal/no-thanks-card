import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import store from "@/store";
import {AnimationConfig} from "../../shared/constants";
import {timeout} from "@/reactivity/game";

export default function changeStatus(msg: ChangeStatusMsg) {
  timeout.value = msg.gameInfo.timeout;
  store.commit('setGameInfo', msg.gameInfo);
  setTimeout(() => {
    store.commit('setPlayers', msg.players);
  }, AnimationConfig.animationTime);
}