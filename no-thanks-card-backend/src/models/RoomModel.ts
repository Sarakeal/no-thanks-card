import {
  ID,
  RoomDef,
} from "../../../no-thanks-card-frontend/shared/ModelDefs";
import { Player } from "./PlayerModel";

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: ID;
  players: Player[];

  password: string;


  constructor(creatorID: ID, password: string) {
    this.creatorID = creatorID;
    this.password = password;

    const roomNumber = Math.random().toString().slice(2, 8);

    this.roomNumber = roomNumber;
  }
}


