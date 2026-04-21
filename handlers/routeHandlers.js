import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewSighting } from "../utils/addNweSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { alertRequestEmitter } from "../events/sightingsEvents.js";

//handleGet

export async function handleGet(res) {
  const dataObject = await getData();
  const stringData = JSON.stringify(dataObject);
  sendResponse(res, 200, ["Content-Type", "application/json"], stringData);
}

//handlePost
export async function handlePost(req, res) {
  try {
    const parsedData = await parseJSONBody(req);
    const sanitizedData = sanitizeInput(parsedData);
    await addNewSighting(sanitizedData);
    alertRequestEmitter.emit("sighting-added", sanitizedData);
    sendResponse(
      res,
      201,
      ["Content-Type", "application/json"],
      JSON.stringify(sanitizedData),
    );
  } catch (error) {
    sendResponse(
      res,
      400,
      ["Content-Type", "application/json"],
      JSON.stringify({ error: error }),
    );
  }
}
