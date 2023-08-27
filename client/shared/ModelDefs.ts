import {AvatarType} from "./constants";

export interface TokenDef {
  ID: string;
  datetime: number;
  roomNumber: string;
}


export interface RoomDef {
  roomNumber: string; // 房间号码, 6 位数字
  creatorID: string; // 创建者 ID
  players: PlayerDef[]; // 参与者
}

export interface PlayerDef {
  id: string;

  name: string;

  index: number;

  cards: number[];

  money: number;

  avatar: AvatarType;
}

export interface GameInfo {

  boardCard: number,
  money: number,
  leftCardNumber: number,
  creatorId: string,
  currentPlayerId: string,
  isFinished: boolean,
}