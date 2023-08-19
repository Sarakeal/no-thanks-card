import { RoomJoinMsg } from "../../shared/WSMsg/RoomJoin";

import { players } from "@/reactivity/game";

export default function roomJoin(msg: RoomJoinMsg) {
  players.value = msg;
}
