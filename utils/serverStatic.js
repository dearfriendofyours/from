import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";

export async function serverStatic(filePath, res, header, notFoundPage) {
  try {
    const content = await fs.readFile(filePath);

    sendResponse(res, 200, header, content);
  } catch (error) {
    const notFoundPageData = await fs.readFile(notFoundPage);
    if (error.code === "ENOENT") {
      sendResponse(res, 404, ["Content-Type", "text/html"], notFoundPageData);
    } else {
      sendResponse(
        res,
        500,
        ["Content-Type", "text/html"],
        `<html><h1>Server Error: ${error.code}</h1></html>`,
      );
    }
  }
}
