import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import store from "@/store";
import {AnimationConfig} from "../../shared/constants";

export default function changeStatus(msg: ChangeStatusMsg) {
  store.commit('setGameInfo', msg.gameInfo);
  setTimeout(() => {
    store.commit('setPlayers', msg.players);
  }, AnimationConfig.animationTime);
}