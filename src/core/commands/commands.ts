import { actionCommand } from "../../modules/action/commands";
import { commandsCommand } from "../../modules/commands";
import { recruitmentCommand } from "../../modules/recruitment";
import { registerCommand } from "../../modules/register";
import { uptimeCommand } from "../../modules/uptime";

export default {
  uptime: uptimeCommand,
  register: registerCommand,
  action: actionCommand,
  recruitment: recruitmentCommand,
  commands: commandsCommand,
};
