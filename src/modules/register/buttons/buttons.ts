import { genericPage } from "../../genericPage";

import * as createchannels_approvalchannel from "./createApproval";
import * as createroles_createapproved from "./createApproved";
import * as createroles_createapprover from "./createApprover";
import * as createchannels_entrychannel from "./createRegister";

export const registerButtons = {
  register_createchannels: genericPage,
  register_editchannels: genericPage,
  register_createroles: genericPage,
  register_editroles: genericPage,
  createchannels_approvalchannel,
  createroles_createapproved,
  createroles_createapprover,
  createchannels_entrychannel,
};
