import {Action} from "../httpMsg/PlayerActMsg";

export interface ActionMsg {

  type: Action,

  movedCard: number, // 拿牌情况下，拿的牌数字
  playerId: string,
}
