import {GameInfo, PlayerDef} from "../ModelDefs";

export interface ChangeStatusMsg {
  players: PlayerDef[]; // 同步所有玩家信息

  gameInfo: GameInfo; // 游戏相关信息
}
