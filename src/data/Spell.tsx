import IEntity from "./IEntity";

export default class Spell extends IEntity {
  classes: string[];
  level: number;
  school: string;
  time: string;
  range: string;
  components: string;
  duration: string;
  ritual: boolean;
  description: string;
  pic: string;
  picBase64: string;

  constructor(
    id?: number,
    name?: string,
    sources?: string,
    filename?: string,
    classes?: string[],
    level?: number,
    school?: string,
    time?: string,
    range?: string,
    components?: string,
    duration?: string,
    description?: string,
    ritual?: boolean,
    pic?: string,
    picBase64?: string
  ) {
    super(id, name, sources, filename);
    this.classes = classes || [];
    this.level = level || 0;
    this.school = school || "";
    this.time = time || "";
    this.range = range || "";
    this.components = components || "";
    this.duration = duration || "";
    this.ritual = ritual || false;
    this.description = description || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
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
  classes = "SetEntity",
  level = "CreatableSetNumber",
  school = "CreatableSetString",
  time = "CompletableString",
  range = "CompletableString",
  components = "SearchableString",
  duration = "CompletableString",
  description = "SearchableText",
  sources = "CompletableString",
  ritual = "SwitchBoolean",
  concentration = "FoundString|duration:concentration",
}

export enum TileConfig {
  school = "ColoredFlag",
  concentration = "FoundFlag|duration:concentration",
  ritual = "BooleanFlag",
  level = "RoundNumberFlag",
  name = "ImageName",
  time = "SmallProp|FaHistory",
  range = "SmallProp|GiBullseye",
  duration = "SmallProp|FaHourglassHalf",
  components = "SmallProp|FaMortarPestle",
  classes = "WideSetProp|FaUser",
  sources = "WideProp|FaLink",
}

export enum DetailConfig {
  school = "CreatableSetString|IoSchool",
  level = "CreatableSetNumber",
  concentration = "FoundFlag|duration:concentration",
  ritual = "SwitchBoolean",
  name = "ImageName",
  time = "CompletableString|FaHistory",
  duration = "CompletableString|FaHourglassHalf",
  range = "CompletableString|GiBullseye",
  components = "SearchableString|FaMortarPestle",
  sources = "CompletableString|FaLink",
  classes = "SetEntity|FaUser",
  description = "SearchableText|FaBookOpen",
}