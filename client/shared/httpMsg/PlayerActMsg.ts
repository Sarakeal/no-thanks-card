
export interface PlayerActRequest {

  action: Action;

  playerId: string;
}


export enum Action {
  ACCEPT = 1,

  REJECT = 0,
}