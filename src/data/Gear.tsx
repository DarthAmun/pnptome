import IEntity from "./IEntity";

export default class Gear extends IEntity {
  description: string;
  pic: string;
  picBase64: string;
  cost: string;
  damage: string;
  weight: string;
  properties: string;
  type: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    description?: string,
    pic?: string,
    picBase64?: string,
    cost?: string,
    damage?: string,
    weight?: string,
    properties?: string,
    type?: string,
    filename?: string
  ) {
    super(id, name, sources, filename);
    this.description = description || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.cost = cost || "";
    this.damage = damage || "";
    this.weight = weight || "";
    this.properties = properties || "";
    this.type = type || "";
    this.id = id;
  }

  static findSearchField = (attrName: string): string => {
    return Object(SearchConfig)[attrName];
  };
  static getSearchConfig = () => {
    return SearchConfig;
  };
  static findTileField = (attrName: string): string => {
    return Object(TileConfig)[attrName];
  };
  static getTileConfig = () => {
    return TileConfig;
  };
  static findDetailField = (attrName: string): string => {
    return Object(DetailConfig)[attrName];
  };
  static getDetailConfig = () => {
    return DetailConfig;
  };
}

export enum SearchConfig {
  name = "SearchableString",
  description = "SearchableText",
  cost = "CompletableString",
  damage = "CompletableString",
  weight = "CompletableString",
  properties = "CompletableString",
  type = "CompletableString",
}

export enum TileConfig {
  type = "ColoredFlag",
  name = "ImageName",
  cost = "SmallProp|FaCoins",
  weight = "SmallProp|FaWeightHanging",
  damage = "SmallProp|GiBloodySword",
  properties = "WideProp|GiSwordSpin",
  sources = "WideProp|FaLink",
}

export enum DetailConfig {
  type = "CreatableSetString|GiSwordSpade",
  name = "ImageName",
  cost = "CompletableString|FaCoins",
  damage = "CompletableString|GiBloodySword",
  weight = "CompletableString|FaWeightHanging",
  properties = "CompletableString|GiSwordSpin",
  description = "SearchableText|FaBookOpen",
}