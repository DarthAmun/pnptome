import IEntity from "../IEntity";

//npcs: "++id, name, pic, char, traits, description, sources, filename",
export default class Npc extends IEntity {
  pic: string;
  picBase64: string;
  char: IEntity | undefined;
  monster: IEntity | undefined;
  traits: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    picBase64?: string,
    char?: IEntity | undefined,
    monster?: IEntity | undefined,
    traits?: string,
    description?: string,
    sources?: string,
    filename?: string
  ) {
    super(id, name, sources, filename);
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.char = char || undefined;
    this.monster = monster || undefined;
    this.traits = traits || "";
    this.description = description || "";
  }
}

export function isNpc(arg: any): arg is Npc {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check =
    arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const traitsCheck = arg.traits !== undefined && typeof arg.traits == "string";
  const descriptionCheck =
    arg.description !== undefined && typeof arg.description == "string";
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    descriptionCheck &&
    traitsCheck &&
    sourcesCheck
  );
}

export function findNpcFormattError(arg: any): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
