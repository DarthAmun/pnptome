import { System } from "../database/SystemReducer";

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
