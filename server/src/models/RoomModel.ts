import {
  ID, PlayerDef,
  RoomDef,
} from "../../../client/shared/ModelDefs";
import {Player} from "./PlayerModel";
import {createError} from "../middleware/errorHandler";
import {Cards} from "../handlers/http/game";

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: ID;
  players: Player[];

  currentPlayer: Player;

  password: string;

  timer: NodeJS.Timeout;

  cards: Cards;

  dealerMoney: number;

  createdAt = new Date();

  private static roomMap: Record<string, Room> = {};

  constructor({
                creator,
                password,
              }: {
    creator: Player;
    password?: string;
  }) {
    this.creatorID = creator._id;
    this.password = password;

    this.players = [creator];
    this.currentPlayer = creator;

    this.cards = new Cards();
    this.dealerMoney = 0;

    let tryTime = 20;
    while (tryTime--) {
      const roomNumber = Math.random().toString().slice(2, 8);
      const prevRoom = Room.roomMap[roomNumber];
      if (
        prevRoom &&
        Date.now() - prevRoom.createdAt.getTime() <
        1000 * 3600 * 24
      ) {
        continue;
      } else {
        this.roomNumber = roomNumber;
        Room.roomMap[this.roomNumber] = this;
        break;
      }
    }
    if (tryTime <= 0) {
      createError({ msg: "创建错误, 请重试!", status: 500 });
    }

  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];

    if (!room) {
      return createError({ status: 400, msg: "未找到房间号" });
    }
    return room;
  }

  static clearRoom(number: string): void {
    delete this.roomMap[number];
  }

  getPlayers(): PlayerDef[] {
    return this.players;
  }

  getPlayerById(id: string): Player {
    const player = this.players.find((p) => p._id === id);
    if (!player)
      return createError({ status: 401, msg: "id 错误" });
    return player;
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

