import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DBData } from "../models";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const adapter = new JSONFile<DBData>("./src/db/db.json");

const getMockData = (): DBData => {
  const mockDataPath = join(__dirname, "mock-data.json");
  return JSON.parse(readFileSync(mockDataPath, "utf-8"));
};

const defaultData = existsSync("./src/db/db.json") ? {
  users: [],
  boards: [],
  tasks: [],
  comments: [],
} : getMockData();

export const db = new Low<DBData>(adapter, defaultData);
