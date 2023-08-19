import { PlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface InitRoomRequest {
  roomNumber: string,
}

export type InitRoomResponse = HttpRes<{
  players: PlayerDef[]; // 当前所有玩家
}>;
