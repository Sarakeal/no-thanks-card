import {PlayerDef} from "../../../client/shared/ModelDefs";
import {AvatarType} from "../../../client/shared/constants";

export class Player implements PlayerDef {
  id: string;

  name: string;

  index: number;

  cards: number[];

  money: number;

  avatar: AvatarType;

  constructor(name, index) {
    this.name = name;
    this.index = index;

    this.id = Math.random().toString(36).substring(2) + this.index;
    this.cards = [];
    this.money = 5;
  }
}
