import { EventEmitter } from "node:events";
import { createAlert } from "../utils/createAlert.js";

export const alertRequestEmitter = new EventEmitter();

alertRequestEmitter.on("sighting-added", createAlert);
