import Dexie from "dexie";
import Book from "../data/Book";
import Encounter from "../data/encounter/Encounter";
import Note from "../data/Note";
import RandomTable from "../data/RandomTable";
import Event from "../data/world/Event";
import Location from "../data/world/Location";
import World from "../data/world/World";
import { System } from "./SystemReducer";

export class PnPTomeDB extends Dexie {
  systems: Dexie.Table<System, number>; // number = type of the primkey
  encounters: Dexie.Table<Encounter, number>; // number = type of the primkey
  books: Dexie.Table<Book, number>; // number = type of the primkey
  randomTables: Dexie.Table<RandomTable, number>; // number = type of the primkey
  worlds: Dexie.Table<World, number>; // number = type of the primkey
  locations: Dexie.Table<Location, number>; // number = type of the primkey
  events: Dexie.Table<Event, number>; // number = type of the primkey
  notes: Dexie.Table<Note, number>; // number = type of the primkey

  constructor() {
    super("PnPTomeDB");
    this.version(1)
      .stores({
        systems: "++id, name, version, pic, entities",
        encounters:
          "++id, [name+sources], name, enemies, players, isPlaying, currentInit, roundCounter, map, mapBase64, dimension",
        books: "++id, [name+sources], name, cover, data, pages, tags",
        randomTables: "++id, [name+sources], name, rows, header, filename",
        campaigns:
          "++id, [name+sources], name, pic, picBase64, description, world, npcs, notes, logs, players, flow, map, sources, filename",
        quests:
          "++id, [name+sources], name, pic, picBase64, description, rewards, followQuest, sources, filename",
        npcs: "++id, [name+sources], name, pic, picBase64, char, monster, traits, description, sources, filename",
        worlds:
          "++id, [name+sources], name, map, description, locations, events, sources, filename",
        locations:
          "++id, [name+sources], name, map, mapBase64, dimension, markers, sources, filename",
        events:
          "++id, [name+sources], name, description, date, sources, filename",
        groups:
          "++id, [name+sources], name, pic, picBase64, description, notes, npcs, players, monsters, flow, sources, filename",
        notes: "++id, [name+sources], name, text, sources, filename",
      })
      .upgrade((tx) => {
        return tx
          .table("spells")
          .toCollection()
          .modify((spell) => {
            spell.description = spell.text;
            delete spell.text;
            spell.classes = spell.classes.replaceAll(" ", "").split(",");
          });
      });

    this.systems = this.table("systems");
    this.encounters = this.table("encounters");
    this.books = this.table("books");
    this.randomTables = this.table("randomTables");
    this.worlds = this.table("worlds");
    this.locations = this.table("locations");
    this.events = this.table("events");
    this.notes = this.table("notes");
  }
}
