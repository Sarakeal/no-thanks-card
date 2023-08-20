import { PlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";
import { ID } from "../ModelDefs";

export interface JoinRoomRequest {
  roomNumber: string,
  name: string,
  password: string,
}

export type JoinRoomResponse = HttpRes<{
  index: number;
  name: string;
  ID: ID;
  player: PlayerDef;
}>;
