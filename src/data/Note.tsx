import IEntity from "./IEntity";

export default class Note extends IEntity {
  text: string;
  tags: string;

  constructor(id?: number, name?: string, sources?: string, text?: string, tags?: string) {
    super(id, name, sources, "");
    this.text = text || "";
    this.tags = tags || "";
  }

  static findSearchField = (attrName: string): string => {
    return Object(SearchConfig)[attrName];
  };

  static getSearchConfig = () => {
    return SearchConfig;
  };
}

export enum SearchConfig {
  classes = "SetEntity",
}