import Dexie from "dexie";
import { Group } from "./GroupReducer";
import { System } from "./SystemReducer";

export class PnPTomeDB extends Dexie {
  systems: Dexie.Table<System, number>; // number = type of the primkey
  groups: Dexie.Table<Group, number>; // number = type of the primkey

  constructor() {
    super("PnPTomeDB");
    this.version(1).stores({
      systems: "++id, name, version, pic, entities",
      groups: "++id, name, gm, players, pic",
    });

    this.systems = this.table("systems");
    this.groups = this.table("groups");
  }
}
