import { actionCommand } from "../../modules/action/commands";
import { changelogCommand } from "../../modules/changelog";
import { commandsCommand } from "../../modules/commands";
import { recruitmentCommand } from "../../modules/recruitment";
import { registerCommand } from "../../modules/register";
import { ticketCommand } from "../../modules/ticket";
import { uptimeCommand } from "../../modules/uptime";

export default {
  uptime: uptimeCommand,
  register: registerCommand,
  action: actionCommand,
  recruitment: recruitmentCommand,
  commands: commandsCommand,
  changelog: changelogCommand,
  ticket: ticketCommand,
};
