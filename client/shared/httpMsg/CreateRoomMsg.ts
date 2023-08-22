import {ID, PlayerDef} from "../ModelDefs";
import { HttpRes } from "./_httpResTemplate";

export interface CreateRoomRequest {

  name: string;
  password: string;

}

export type CreateRoomResponse = HttpRes<{
  roomNumber: string;
  ID: ID;
  player: PlayerDef;
}>;
