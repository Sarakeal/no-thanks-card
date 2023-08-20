
export type ID = string; // 玩家 id

export interface TokenDef {
  ID: ID;
  datetime: number;
  roomNumber: string;
}


export interface RoomDef {
  roomNumber: string; // 房间号码, 6 位数字
  creatorID: ID; // 创建者 ID
  players: PlayerDef[]; // 参与者
}

export interface PlayerDef {
  _id: ID;

  name: string;

  index: number;

  cards: number[];

  money: number;
}