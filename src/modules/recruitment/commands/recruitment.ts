import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName('recruitment')
.setDescription('Recruitment')

export function execute(interaction: CommandInteraction) {
  console.log('SLA')
}