
export interface PlayerActRequest {

  action: Action;

  playerId: string;
}


export enum Action {
  ACCEPT = 1, // 拿牌

  REJECT = 2,
}