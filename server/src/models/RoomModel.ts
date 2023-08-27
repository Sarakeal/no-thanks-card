import {PlayerDef, RoomDef,} from "../../../client/shared/ModelDefs";
import {AvatarType, RoomStatus} from "../../../client/shared/constants";
import {Player} from "./PlayerModel";
import {createError} from "../middleware/errorHandler";
import {Cards} from "../handlers/http/game";
import {shuffle} from "../util";

const AVATAR_LIST = [
  AvatarType.Bear,
  AvatarType.Cat,
  AvatarType.Cat2,
  AvatarType.Clown,
  AvatarType.ClownRed,
  AvatarType.Cow,
  AvatarType.Dog,
  AvatarType.Elephant,
  AvatarType.Fox,
  AvatarType.Frog,
  AvatarType.Koala,
  AvatarType.Lion,
  AvatarType.Money,
  AvatarType.Owl,
  AvatarType.Panda,
  AvatarType.Pig,
  AvatarType.Rabbit,
  AvatarType.Turtle,
  AvatarType.Unicorn,
]

export class Room implements RoomDef {
  roomNumber: string;
  creatorID: string;
  players: Player[];

  currentPlayer: Player;

  timer: NodeJS.Timeout;

  cards: Cards;

  dealerMoney: number;

  createdAt = new Date();

  avatarList = AVATAR_LIST;

  status: RoomStatus;

  private static roomMap: Record<string, Room> = {};

  constructor(creator: Player) {
    this.roomNumber = this.generateRoomNumber();
    Room.roomMap[this.roomNumber] = this;

    shuffle(this.avatarList);

    this.creatorID = creator.id;
    creator.avatar = this.avatarList[0];

    this.players = [creator];
    this.currentPlayer = creator;

    this.cards = new Cards();
    this.dealerMoney = 0;

    this.status = RoomStatus.Waiting;
  }

  private generateRoomNumber() {
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
        return roomNumber;
      }
    }

    if (tryTime <= 0) {
      createError({ msg: "创建错误, 请重试!", status: 500 });
    }
  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];

    if (!room) {
      return createError({status: 400, msg: "未找到房间号"});
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
    const player = this.players.find((p) => p.id === id);
    if (!player)
      return createError({status: 401, msg: "id 错误"});
    return player;
  }

  joinPlayer(name: string): PlayerDef {
    const index = this.players.length;

    const player = new Player(name, index);
    player.avatar = this.avatarList[index];

    this.players.push(player);
    return player;
  }

  getNextPlayer(): PlayerDef {
    const totalPlayerCount = this.players.length;
    return this.players[(this.currentPlayer.index + 1) % totalPlayerCount];
  }
}


