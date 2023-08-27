import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import store from "@/store";

export default function changeStatus(msg: ChangeStatusMsg) {
  store.commit('setPlayers', msg.players);
  store.commit('setGameInfo', msg.gameInfo);
}