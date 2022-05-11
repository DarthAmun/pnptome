import {
  reciveAll,
  reciveAllByAttribute,
  reciveAllEntities,
  reciveAllPromise,
} from "./DatabaseService";
import { IndexableType } from "dexie";
import Encounter from "../data/encounter/Encounter";
import Location from "../data/world/Location";
import Event from "../data/world/Event";
import World from "../data/world/World";
import IEntity from "../data/IEntity";
import { useSelector } from "react-redux";
import { selectDBName } from "../database/SystemReducer";
import { copyFileSync } from "fs";

export const downloadAllFromTableByAttr = async (
  systemDbName: string,
  tableName: string,
  attr: string,
  attrLike: string,
  fileName: string
) => {
  reciveAllByAttribute(
    systemDbName,
    tableName,
    attr,
    attrLike,
    (all: IEntity[]) => {
      let entity = { [tableName]: all };
      downloadContent(entity, fileName);
    }
  );
};

export const downloadAllFromTable = async (
  systemDbName: string,
  tableName: string,
  fileName: string
) => {
  reciveAll(systemDbName, tableName, (all: IndexableType[]) => {
    let entity = { [tableName]: all };
    downloadContent(entity, fileName);
  });
};

export const downloadBackup = async (
  systemDbName: string,
  filename: string,
  updateProgress: (progress: number) => void
) => {
  console.time("Get all");
  let backupEntities: any = {};
  let tables: string[] = await reciveAllEntities(systemDbName);

  let dataPromises: Promise<any>[] = [];
  tables.forEach((table: string) => {
    dataPromises.push(reciveAllPromise(systemDbName, table));
  });
  await Promise.all(dataPromises).then((values: any[]) => {
    values.forEach((test: any) => {
      backupEntities[test.name] = test.data;
    });
  });
  updateProgress(50);
  console.timeEnd("Get all");

  downloadContent(backupEntities, filename);
  updateProgress(100);
};

const downloadContent = (all: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([JSON.stringify(all)]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // 3. Append to html page
  document.body.appendChild(link); // 4. Force download
  link.click(); // 5. Clean up and remove the link
  document.body.removeChild(link);
};
