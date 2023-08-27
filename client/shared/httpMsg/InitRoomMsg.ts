import {GameInfo, PlayerDef} from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";
import {RoomStatus} from "../constants";

export interface InitRoomRequest {
  roomNumber: string,
}

export type InitRoomResponse = HttpRes<{
  status: RoomStatus,
  creatorId: string,
  players: PlayerDef[]; // 同步所有玩家信息
  gameInfo: GameInfo; // 游戏相关信息
}>;
