import {
    ID, PlayerDef
} from "../../../no-thanks-card-frontend/shared/ModelDefs";

export class Player implements PlayerDef {
  ID: ID;

  name: string;

  index: number;

  constructor(name, index) {
    this.name = name;
    this.index = index;
  }
}
