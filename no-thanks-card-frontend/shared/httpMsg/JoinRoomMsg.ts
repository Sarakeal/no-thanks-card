import { PlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface JoinRoomRequest {
  roomNumber: string,
  name: string,
  password: string,
}

export type JoinRoomResponse = HttpRes<{
  index: number;
  name: string;
}>;
