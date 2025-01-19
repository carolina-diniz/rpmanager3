import { actionCommand } from "../../modules/action/commands";
import { registerCommand } from "../../modules/register";
import { uptimeCommand } from "../../modules/uptime";

export default {
  uptime: uptimeCommand,
  register: registerCommand,
  action: actionCommand,
};
