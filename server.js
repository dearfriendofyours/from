import http from "node:http";
import path from "node:path";
import { getContentType } from "./utils/getContentType.js";
import { serverStatic } from "./utils/serverStatic.js";
import { URL } from "node:url";
import { handleGet, handlePost } from "./handlers/routeHandlers.js";

const PORT = 8100;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const publicDir = path.join(__dirname, "public");
  const pathToResource = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url,
  );
  const notFoundPath = path.join(publicDir, "404.html");
  const ext = path.extname(pathToResource);
  const contentType = getContentType(ext);

  const parseUrl = new URL(url, `http://${req.headers.host}`);
  const routKey = `${method}:${parseUrl.pathname}`;

  if (routKey === "GET:/api") {
    return await handleGet(res);
  } else if (!req.url.startsWith("/api")) {
    return await serverStatic(
      pathToResource,
      res,
      ["Content-Type", contentType],
      notFoundPath,
    );
  } else if (routKey === "POST:/api") {
    await handlePost(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
