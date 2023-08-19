import {
  ID, PlayerDef,
  RoomDef,
} from "../../../no-thanks-card-frontend/shared/ModelDefs";
import {Player} from "./PlayerModel";

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: ID;
  players: Player[];

  password: string;

  private static roomMap: Record<string, Room> = {};

  constructor({
                creator,
                password,
              }: {
    creator: Player;
    password?: string;
  }) {
    this.creatorID = creator.ID;
    this.password = password;

    this.players = [creator]

    const roomNumber = Math.random().toString().slice(2, 8);

    this.roomNumber = roomNumber;

    Room.roomMap[this.roomNumber] = this;
  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];
    // TODO if room not exist
    return room;
  }

  getPlayers(): PlayerDef[] {
    return this.players;
  }

  joinPlayer(name: string, password: string): PlayerDef {
    if (this.password && this.password !== password) {
      //TODO error handler
      console.error('password wrong');
    }

    const index = this.players.length + 1;

    const player = new Player(name, index);

    this.players.push(player);
    return player;
  }

}


