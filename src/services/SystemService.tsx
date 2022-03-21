import Dexie from "dexie";
import { System, SystemEntity } from "../database/SystemReducer";

export const findSearchField = (
  system: System,
  entityName: string,
  attrName: string
): string => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return Object(system.entities[index].searchConfig)[attrName];
};

export const getSearchConfig = (system: System, entityName: string) => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return system.entities[index].searchConfig;
};

export const findTileField = (
  system: System,
  entityName: string,
  attrName: string
): string => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return Object(system.entities[index].tileConfig)[attrName];
};

export const getTileConfig = (system: System, entityName: string) => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return system.entities[index].tileConfig;
};

export const findDetailField = (
  system: System,
  entityName: string,
  attrName: string
): string => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return Object(system.entities[index].detailConfig)[attrName];
};

export const getDetailConfig = (system: System, entityName: string) => {
  const index = system.entities.findIndex(
    (entity) => entity.entityName === entityName
  );
  return system.entities[index].detailConfig;
};

const formatSystemName = (name: string) => {
  return name.replaceAll(" ", "").toLowerCase().trim();
};

const makeSchema = (system: System) => {
  let schema: string = "";
  system.entities.forEach((entity: SystemEntity, entityIndex: number) => {
    schema += `"${entity.entityName.toLowerCase()}s": "`;
    entity.attributes.forEach((attr: string, fieldIndex: number) => {
      if (attr.toLowerCase() === "id") schema += "++id";
      else schema += `${attr.toLowerCase()}`;
      if (entity.attributes.length - 1 !== fieldIndex) schema += ",";
    });
    schema += `"`;
    if (system.entities.length - 1 !== entityIndex) schema += ",";
  });
  return JSON.parse(`{${schema}}`);
};

export const generateSystem = (system: System) => {
  const db = new Dexie(`${formatSystemName(system.name)}-${system.version}`);
  const schema = makeSchema(system);
  console.log(`${formatSystemName(system.name)}-${system.version} generated.`);
  db.version(1).stores(schema);
  db.open();
};
