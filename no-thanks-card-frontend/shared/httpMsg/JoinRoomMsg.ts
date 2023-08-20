import { PlayerDef } from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";
import { ID, index } from "../ModelDefs";

export interface JoinRoomRequest {
  roomNumber: string,
  name: string,
  password: string,
}

export type JoinRoomResponse = HttpRes<{
  index: index;
  name: string;
  ID: ID;
}>;
