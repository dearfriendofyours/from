import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";

export async function serverStatic(filePath, res, header) {
  try {
    const content = await fs.readFile(filePath);

    sendResponse(res, 200, header, content);
  } catch (error) {
    sendResponse(res, 404, ["Content-Type", "text/plain"], "Not Found");
    console.log(error);
  }
}
