export function sendResponse(res, code, header, content) {
  res.statusCode = code;
  res.setHeader(...header);
  res.end(content);
}
