export const SERVER_DOMAIN =
  "http://localhost:3011";


export const WS_SERVER_DOMAIN =
  "ws://localhost:3000";

export const SERVER_BASE_URL = "/api";

export const IDHeaderName = "player-id";
export const RoomNumberHeaderName = "room-number";

export enum RoomStatus {
  NotExist = 0, // 房间不存在
  Waiting = 1, // 正在等待玩家进入
  Running = 2, // 游戏进行中
  End = 3, // 游戏结束但房间还在
}

export enum AvatarType {
  Bear = 'bear',
  Cat = 'cat',
  Cat2 = 'cat2',
  Clown = 'clown',
  ClownRed = 'clown_red',
  Cow = 'cow',
  Dog = 'dog',
  Elephant = 'elephant',
  Fox = 'fox',
  Frog = 'frog',
  Koala = 'koala',
  Lion = 'lion',
  Money = 'money',
  Owl = 'owl',
  Panda = 'panda',
  Pig = 'pig',
  Rabbit = 'rabbit',
  Turtle = 'turtle',
  Unicorn = 'unicorn',
}

