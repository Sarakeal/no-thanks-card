import {
    ID, PlayerDef
} from "../../../no-thanks-card-frontend/shared/ModelDefs";

export class Player implements PlayerDef {
  _id: ID;

  name: string;

  index: number;

  cards: number[];

  money: number;

  constructor(name, index) {
    this.name = name;
    this.index = index;

    this._id = Math.random().toString(36).substring(2) + this.index;
    this.cards = [];
    this.money = 5;
  }
}
