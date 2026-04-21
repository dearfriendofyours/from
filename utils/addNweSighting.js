import fs from "node:fs/promises";
import { getData } from "./getData.js";
import path from "node:path";

export async function addNewSighting(newSighting) {
  try {
    const dataFile = await getData();
    dataFile.push(newSighting);
    const pathToFile = path.join(process.cwd(), "data", "data.json");
    const jsonString = JSON.stringify(dataFile, null, 2);
    await fs.writeFile(pathToFile, jsonString, "utf-8");
  } catch (error) {
    throw new Error(error);
  }
}
