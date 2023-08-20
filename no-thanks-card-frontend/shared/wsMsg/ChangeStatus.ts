import {PlayerDef} from "../ModelDefs";

export interface ChangeStatusMsg {
  timeout: number; // 有多少秒可以确认

  player: PlayerDef; // 当前进行操作的玩家

  card: number; // 当前卡牌

  players: PlayerDef[]; // 同步所有玩家信息

  dealerMoney: number; // 庄家的钱
}
