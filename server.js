import http from "node:http";
import path from "node:path";
import { serverStatic } from "./utils/serverStatic.js";
import fs from "node:fs/promises";
import { getContentType } from "./utils/getContentType.js";

const PORT = 8100;

const __dirname = import.meta.dirname;

const server = http.createServer((req, res) => {
  const publicDir = path.join(__dirname, "public");
  const pathToResource = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(pathToResource);
  const contentType = getContentType(ext);
  serverStatic(pathToResource, res, ["Content-Type", contentType]);
});

server.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
