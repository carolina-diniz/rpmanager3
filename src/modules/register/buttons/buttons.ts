import { genericPage } from "../../genericPage";

import * as createchannels_approvalchannel from "./createApprovalChannel";
import * as createroles_createapproved from "./createApprovedMember";
import * as createchannels_entrychannel from "./createEntryChannel";
import * as createroles_createapprover from "./createEntryManager";
import * as register_start from './register_start';

export const registerButtons = {
  register_createchannels: genericPage,
  register_editchannels: genericPage,
  register_createroles: genericPage,
  register_editroles: genericPage,
  createchannels_approvalchannel,
  createroles_createapproved,
  createroles_createapprover,
  createchannels_entrychannel,
  register_start,
};
