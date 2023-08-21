import {GameInfo, PlayerDef} from "../ModelDefs";

export interface ChangeStatusMsg {


  player: PlayerDef; // 当前进行操作的玩家


  players: PlayerDef[]; // 同步所有玩家信息

  gameInfo: GameInfo; // 游戏相关信息
}
