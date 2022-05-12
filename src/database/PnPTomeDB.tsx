import Dexie from "dexie";
import { System } from "./SystemReducer";

export class PnPTomeDB extends Dexie {
  systems: Dexie.Table<System, number>; // number = type of the primkey

  constructor() {
    super("PnPTomeDB");
    this.version(1).stores({
      systems: "++id, name, version, pic, entities",
    });

    this.systems = this.table("systems");
  }
}
