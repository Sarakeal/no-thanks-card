import { PlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";
import {RoomStatus} from "../constants";

export interface InitRoomRequest {
  roomNumber: string,
}

export type InitRoomResponse = HttpRes<{
  status: RoomStatus,
  creatorId: string,
  players: PlayerDef[]; // 当前所有玩家
}>;
