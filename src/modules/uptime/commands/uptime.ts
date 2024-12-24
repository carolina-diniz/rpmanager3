import { EmbedBuilder } from "@discordjs/builders";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "../../../connections";

export const data = new SlashCommandBuilder().setName("uptime").setDescription("Shows the bot's uptime.");

export async function execute(interaction: CommandInteraction) {
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor(uptime / 3600) % 24;
  const minutes = Math.floor(uptime / 60) % 60;
  const seconds = Math.floor(uptime) % 60;

  const embed = new EmbedBuilder()
    .setTitle(client.user!.username)
    .setDescription(
      "**Status**: ` Online ✅ `\n" + `**Uptime:** <t:${Math.floor(Date.now() / 1000 - uptime)}:R>`
    );

  await interaction.reply({ embeds: [embed] });
}
