import { PnPTomeDB } from "../database/PnPTomeDB";
import Dexie, { IndexableType } from "dexie";
import IEntity from "../data/IEntity";
import Filter from "../data/Filter";
import { Notification, Tag, toaster } from "rsuite";
import { System } from "../database/SystemReducer";
import { Group } from "../database/GroupReducer";

export const reciveAllFromTable = (
  dbName: string,
  tableName: string,
  callback: (data: IndexableType[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .orderBy("name")
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveByAttributes = (
  dbName: string,
  tableName: string,
  name: string,
  value: number | string,
  callback: (data: IndexableType) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .where(name)
        .equals(value)
        .toArray()
        .then((array) => {
          callback(array[0]);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const deleteSystem = (data: System) => {
  console.log(data);
  const db = new PnPTomeDB();
  db.open()
    .then(() => {
      db.table("systems")
        .delete(data.id)
        .then(() => {
          toaster.push(
            <Notification header={"Success"} closable type="success">
              Deletion successfull!
            </Notification>,
            { placement: "bottomStart" }
          );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const deleteGroup = (data: Group) => {
  console.log(data);
  const db = new PnPTomeDB();
  db.open()
    .then(() => {
      db.table("groups")
        .delete(data.id)
        .then(() => {
          toaster.push(
            <Notification header={"Success"} closable type="success">
              Deletion successfull!
            </Notification>,
            { placement: "bottomStart" }
          );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const updateSystem = (data: System) => {
  console.log(data);
  const db = new PnPTomeDB();
  db.open()
    .then(() => {
      db.table("systems")
        .update(data.id, data)
        .then(() => {
          toaster.push(
            <Notification header={"Success"} closable type="success">
              Overwrite successfull!
            </Notification>,
            { placement: "bottomStart" }
          );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const updateGroup = (data: Group) => {
  console.log(data);
  const db = new PnPTomeDB();
  db.open()
    .then(() => {
      db.table("groups")
        .update(data.id, data)
        .then(() => {
          toaster.push(
            <Notification header={"Success"} closable type="success">
              Overwrite successfull!
            </Notification>,
            { placement: "bottomStart" }
          );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const updateWithCallback = (
  dbName: string,
  tableName: string,
  data: IEntity,
  callback: (data: number) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .update(data.id, data)
        .then((result: number) => {
          callback(result);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const save = (dbName: string, tableName: string, data: IEntity) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName).add(data);
    })
    .finally(() => {
      db.close();
    });
};

export const saveNewFromList = (
  dbName: string,
  tableName: string,
  entities: IEntity[]
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(async () => {
      const refinedEntities = (entities as IEntity[]).map((entity: IEntity) => {
        delete entity["id"];
        return { ...entity, filename: entity.sources };
      });
      try {
        const prom = await db.table(tableName).bulkPut(refinedEntities);
        return prom;
      } catch (error) {
        console.log(error);
      }
    })
    .finally(() => {
      db.close();
    });
};

export const resaveFromList = (
  dbName: string,
  tableName: string,
  entities: IEntity[]
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(async () => {
      const refinedEntities = (entities as IEntity[]).map((entity: IEntity) => {
        delete entity["id"];
        return entity;
      });
      const prom = await db.table(tableName).bulkPut(refinedEntities);
      return prom;
    })
    .finally(() => {
      db.close();
    });
};

export const saveWithCallback = (
  dbName: string,
  tableName: string,
  data: IEntity,
  callback: (data: number) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .add(data)
        .then((result) => {
          callback(result as number);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const remove = (
  dbName: string,
  tableName: string,
  id: number | undefined
) => {
  const db = new Dexie(dbName);
  if (id !== undefined) {
    db.open()
      .then(() => {
        db.table(tableName).delete(id);
      })
      .finally(() => {
        db.close();
      });
  }
};

export const reciveAll = (
  dbName: string,
  tableName: string,
  callback: (data: IndexableType[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .orderBy("name")
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveCount = (
  dbName: string,
  tableName: string,
  callback: (value: number) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName).count((count) => {
        callback(count);
      });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveCountPromise = (dbName: string, tableName: string) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(() => {
      return db.table(tableName).count();
    })
    .finally(() => {
      db.close();
    });
};

export const reciveSystem = (
  dbName: string,
  value: number,
  callback: (data: System) => void
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(() => {
      db.table("systems")
        .get(value)
        .then((val) => {
          callback(val);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveGroup = (
  dbName: string,
  value: number,
  callback: (data: Group) => void
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(() => {
      db.table("groups")
        .get(value)
        .then((val) => {
          callback(val);
        });
    })
    .finally(() => {
      db.close();
    });
};


export const reciveByAttribute = (
  dbName: string,
  tableName: string,
  name: string,
  value: string,
  callback: (data: IEntity) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .where(name)
        .equalsIgnoreCase(value)
        .toArray()
        .then((array) => {
          callback(array[0]);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllByAttribute = (
  dbName: string,
  tableName: string,
  name: string,
  value: string,
  callback: (data: IEntity[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .where(name)
        .equalsIgnoreCase(value)
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const recivePromiseByAttribute = (
  dbName: string,
  tableName: string,
  name: string,
  value: string
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(async () => {
      const array = await db
        .table(tableName)
        .where(name)
        .equalsIgnoreCase(value)
        .toArray();
      return array[0];
    })
    .finally(() => {
      db.close();
    });
};

export const recivePromiseByMultiAttribute = (
  dbName: string,
  tableName: string,
  obj: {
    name: string;
    sources: string;
  }
) => {
  const db = new Dexie(dbName);
  if (obj.sources !== undefined) {
    return db
      .open()
      .then(async () => {
        return await db.table(tableName).where(obj).first();
      })
      .finally(() => {
        db.close();
      });
  } else {
    // delete obj.sources;
    return db
      .open()
      .then(async () => {
        return await db.table(tableName).where(obj).first();
      })
      .finally(() => {
        db.close();
      });
  }
};

export const reciveAllEntities = (systemDbName: string) => {
  const db = new Dexie(systemDbName);
  return db
    .open()
    .then(() => {
      let tables: string[] = [];
      db.tables.forEach((table) => tables.push(table.name));
      return tables;
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllByAttributes = (
  dbName: string,
  tableName: string,
  obj: { one: string; two: string },
  vals: { one: string; two: string },
  callback: (data: IEntity[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .where(obj.one)
        .equalsIgnoreCase(vals.one)
        .filter((result: any) =>
          vals.two !== "" ? result[obj.two] === vals.two : true
        )
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllPromiseByAttribute = (
  dbName: string,
  tableName: string,
  name: string,
  value: string
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(async () => {
      const array = await db
        .table(tableName)
        .where(name)
        .equalsIgnoreCase(value)
        .toArray();
      return array;
    })
    .finally(() => {
      db.close();
    });
};

export const recivePromise = (
  dbName: string,
  tableName: string,
  value: number
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(async () => {
      return await db.table(tableName).get(value);
    })
    .finally(() => {
      db.close();
    });
};

export const recivePromiseByAttributeCount = (
  dbName: string,
  tableName: string,
  name: string,
  value: string | number
) => {
  const db = new Dexie(dbName);
  if (typeof value === "string") {
    return db
      .open()
      .then(async () => {
        return await db
          .table(tableName)
          .where(name)
          .equalsIgnoreCase(value)
          .count();
      })
      .finally(() => {
        db.close();
      });
  } else if (typeof value === "number") {
    return db
      .open()
      .then(async () => {
        return await db.table(tableName).where(name).equals(value).count();
      })
      .finally(() => {
        db.close();
      });
  } else {
    return db
      .open()
      .then(async () => {
        return await db
          .table(tableName)
          .where(name)
          .equalsIgnoreCase("" + value)
          .count();
      })
      .finally(() => {
        db.close();
      });
  }
};

export const reciveAllPromise = (dbName: string, tableName: string) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(async () => {
      const data = await db.table(tableName).orderBy("name").toArray();
      return { name: tableName, data: data };
    })
    .finally(() => {
      db.close();
    });
};

export const applyFilters = (obj: any, filters: Filter[]) => {
  let test: boolean[] = [];
  filters.forEach((filter) => {
    if (typeof filter.value === "string") {
      if (obj[filter.fieldName] instanceof Array) {
        let hasTag = false;
        obj[filter.fieldName].forEach((fieldPart: string) => {
          // @ts-ignore
          if (fieldPart.toLowerCase().includes(filter.value.toLowerCase())) {
            hasTag = true;
          }
        });
        if (hasTag) {
          test.push(true);
        } else {
          test.push(false);
        }
      } else {
        if (obj[filter.fieldName] !== undefined)
          test.push(
            // @ts-ignore
            obj[filter.fieldName]
              .toLowerCase()
              .includes(filter.value.toLowerCase())
          );
      }
    } else if (typeof filter.value === "number") {
      // @ts-ignore
      test.push(obj[filter.fieldName] === filter.value);
    } else if (typeof filter.value === "boolean") {
      // @ts-ignore
      const objValue: number | boolean = obj[filter.fieldName];
      if (typeof objValue === "number")
        test.push(obj[filter.fieldName] === +filter.value);
      else test.push(obj[filter.fieldName] === filter.value);
    } else if (filter.value instanceof Array) {
      let arrayTest: boolean = false;
      filter.value.forEach((filterPart: string | boolean | number) => {
        if (typeof filterPart === "string") {
          if (obj[filter.fieldName] instanceof Array) {
            obj[filter.fieldName].forEach((val: string) => {
              if (val.toLowerCase() === filterPart.toLowerCase()) {
                arrayTest = true;
              }
            });
          } else if (
            // @ts-ignore
            obj[filter.fieldName].toLowerCase() === filterPart.toLowerCase()
          )
            arrayTest = true;
        } else if (typeof filterPart === "number") {
          // @ts-ignore
          if (obj[filter.fieldName] === filterPart) arrayTest = true;
        } else if (typeof filterPart === "boolean") {
          // @ts-ignore
          if (obj[filter.fieldName] === filterPart) arrayTest = true;
        }
      });
      test.push(arrayTest);
    }
  });

  let result = true;
  test.forEach((val) => {
    if (!val) result = false;
  });
  return result;
};

export const reciveAllFiltered = (
  dbName: string,
  tableName: string,
  filters: Filter[],
  callback: (data: IndexableType[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      let sortedFiled: string = "name";
      let reverse: boolean = false;

      filters.forEach((filter: Filter) => {
        if (filter.sort !== 0) {
          sortedFiled = filter.fieldName;
          if (filter.sort === 2) reverse = true;
        }
      });

      if (reverse) {
        db.table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .reverse()
          .sortBy(sortedFiled)
          .then((data) => {
            callback(data);
          });
      } else {
        db.table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .sortBy(sortedFiled)
          .then((data) => {
            callback(data);
          });
      }
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllFilteredPromise = (
  dbName: string,
  tableName: string,
  filters: Filter[]
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(() => {
      let sortedFiled: string = "name";
      let reverse: boolean = false;

      filters.forEach((filter: Filter) => {
        if (filter.sort !== 0) {
          sortedFiled = filter.fieldName;
          if (filter.sort === 2) reverse = true;
        }
      });

      if (reverse) {
        return db
          .table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .reverse()
          .sortBy(sortedFiled);
      } else {
        return db
          .table(tableName)
          .filter((obj) => applyFilters(obj, filters))
          .sortBy(sortedFiled);
      }
    })
    .catch((reason) => {
      console.log(reason);
      return undefined;
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAttributeSelection = (
  dbName: string,
  tableName: string,
  attribute: string,
  callback: (data: IndexableType[]) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .orderBy(attribute)
        .uniqueKeys(function (array) {
          callback(array);
        });
    })
    .catch((reason) => {
      console.log(reason);
      callback([]);
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAttributeSelectionPromise = (
  dbName: string,
  tableName: string,
  attribute: string
) => {
  const db = new Dexie(dbName);
  return db
    .open()
    .then(() => {
      return db.table(tableName).orderBy(attribute).uniqueKeys();
    })
    .finally(() => {
      db.close();
    });
};

export const createNewWithId = (
  dbName: string,
  tableName: string,
  entity: IEntity,
  callback: (id: number) => void
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .put(entity)
        .then((id) => {
          callback(id as number);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const deleteAll = (dbName: string, tableName: string) => {
  console.log(dbName, tableName);
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .clear()
        .then(() => {
          toaster.push(
            <Notification header={"Success"} closable type="success">
              Deleted all {tableName}.
            </Notification>,
            { placement: "bottomStart" }
          );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const deleteAllByAttrs = (
  dbName: string,
  tableName: string,
  attr: string,
  attrs: string[]
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName).where(attr).anyOf(attrs).delete();
    })
    .finally(() => {
      db.close();
    });
};

export const deleteAllByAttr = (
  dbName: string,
  tableName: string,
  attr: string,
  attrs: string
) => {
  const db = new Dexie(dbName);
  db.open()
    .then(() => {
      db.table(tableName)
        .where(attr)
        .equals(attrs)
        .delete()
        .then((deleteCount) => {
          if (deleteCount > 0)
            toaster.push(
              <Notification header={"Success"} closable type="success">
                Deleted all <Tag size="lg">{deleteCount}</Tag> {tableName} where{" "}
                {attr} was equal to {attrs}.
              </Notification>,
              { placement: "bottomStart" }
            );
          else
            toaster.push(
              <Notification header={"Warning"} closable type="warning">
                Found <Tag size="lg">{deleteCount}</Tag> {tableName} where{" "}
                {attr} was equal to {attrs}.
              </Notification>,
              { placement: "bottomStart" }
            );
        });
    })
    .finally(() => {
      db.close();
    });
};

export const exportFilteredFromTable = (
  dbName: string,
  tableName: string,
  filters: Filter[],
  filename: string
) => {
  reciveAllFiltered(dbName, tableName, filters, (all: IndexableType[]) => {
    const data = { [tableName]: all };
    let contentType = "application/json;charset=utf-8;";
    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" + contentType + "," + encodeURIComponent(JSON.stringify(data));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

export const deleteDatabase = (dbName: string) => {
  const db = new Dexie(dbName);
  db.delete();
};
