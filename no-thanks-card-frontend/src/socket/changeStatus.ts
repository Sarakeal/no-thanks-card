import {ChangeStatusMsg} from "../../shared/wsMsg/ChangeStatus";
import {currentPlayer, dealerMoney, card} from "@/reactivity/game";
import { players } from "@/reactivity/game";

export default function changeStatus(msg: ChangeStatusMsg) {
  console.log(msg)
  currentPlayer.value = msg.player;
  players.value = msg.players;
  dealerMoney.value = msg.dealerMoney;
  card.value = msg.card;
}
