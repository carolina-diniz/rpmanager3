import { registerCommand } from "../../modules/register";
//import { updatePedirsetCommand } from "../../modules/updatePedirset";
//import { updateMembersCommand } from "../../modules/updateMembers/commands";
import { uptimeCommand } from "../../modules/uptime";

export default {
  uptime: uptimeCommand,
  register: registerCommand,
  //update_members: updateMembersCommand,
  //update_pedirset: updatePedirsetCommand,
};
