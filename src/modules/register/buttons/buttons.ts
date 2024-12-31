import { genericPage } from "../../genericPage";
import { createchannels_createapproval, createchannels_createregister } from "./createChannels";
import { createroles_createapproval, createroles_createapproved } from "./createRoles";

export const registerButtons = {
  register_createchannels: genericPage,
  register_editchannels: genericPage,
  register_createroles: genericPage,
  register_editroles: genericPage,
  createchannels_createregister,
  createchannels_createapproval,
  createroles_createapproved,
  createroles_createapproval,
};
