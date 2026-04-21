import path from "node:path";
import fs from "node:fs/promises";

export async function getData() {
  const dir = process.cwd();
  try {
    const pathToData = path.join(dir, "data", "data.json");
    const dataString = await fs.readFile(pathToData, "utf-8");
    const dataObject = JSON.parse(dataString);
    return dataObject;
  } catch (err) {
    console.log(err);
    return [];
  }
}
