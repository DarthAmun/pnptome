import IEntity from "../IEntity";
import Location from "../world/Location";
import Campaign from "./Campaign";
import Npc from "./Npc";

export default class BuildCampaign {
  campaign: Campaign;
  characters: IEntity[];
  npcs: Npc[];
  map: Location;

  constructor(champaign?: Campaign, characters?: IEntity[], npcs?: Npc[], map?: Location) {
    this.campaign = champaign || new Campaign();
    this.characters = characters || [];
    this.npcs = npcs || [];
    this.map = map || new Location();
  }
}
