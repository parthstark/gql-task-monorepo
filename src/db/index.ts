import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DBData } from "../models";

const adapter = new JSONFile<DBData>("./src/db/db.json");

export const db = new Low<DBData>(adapter, {
  users: [],
  boards: [],
  tasks: [],
  comments: [],
});
