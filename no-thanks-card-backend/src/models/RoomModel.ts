import {
  ID, PlayerDef,
  RoomDef,
} from "../../../no-thanks-card-frontend/shared/ModelDefs";
import {Player} from "./PlayerModel";
import {createError} from "../middleware/errorHandler";

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: ID;
  players: Player[];

  currentPlayer: Player;

  password: string;

  timer: NodeJS.Timeout;

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

    this.players = [creator];
    this.currentPlayer = creator;

    const roomNumber = Math.random().toString().slice(2, 8);

    this.roomNumber = roomNumber;

    Room.roomMap[this.roomNumber] = this;
  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];

    if (!room) {
      return createError({ status: 400, msg: "未找到房间号" });
    }
    return room;
  }

  getPlayers(): PlayerDef[] {
    return this.players;
  }

  joinPlayer(name: string, password: string): PlayerDef {
    if (this.password && this.password !== password) {
      return createError({ status: 401, msg: "密码错误" });
    }

    const index = this.players.length;

    const player = new Player(name, index);

    this.players.push(player);
    return player;
  }

  getNextPlayer(): PlayerDef {
    const totalPlayerCount = this.players.length;
    return this.players[(this.currentPlayer.index + 1) % totalPlayerCount];
  }
}


