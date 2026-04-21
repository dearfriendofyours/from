import { json } from "node:stream/consumers";

export async function parseJSONBody(req, res) {
  try {
    const parsedBody = await json(req);
    return parsedBody;
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err}`);
  }
}
