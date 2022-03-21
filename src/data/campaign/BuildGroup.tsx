import IEntity from "../IEntity";
import Group from "./Group";
import Npc from "./Npc";

export default class BuildGroup {
  group: Group;
  characters: IEntity[];
  npcs: Npc[];
  monsters: IEntity[]

  constructor(champaign?: Group, characters?: IEntity[], npcs?: Npc[], monsters?: IEntity[]) {
    this.group = champaign || new Group();
    this.characters = characters || [];
    this.npcs = npcs || [];
    this.monsters = monsters || [];
  }
}
