import { EmbedBuilder } from "@discordjs/builders";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "../../../connections";

export const data = new SlashCommandBuilder().setName("uptime").setDescription("Shows the bot's uptime.");

export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const uptime = process.uptime();

  const embed = new EmbedBuilder()
    .setTitle(client.user!.username)
    .setDescription(
      "**Status**: ` Online ✅ `\n" +
        `**Uptime:** <t:${Math.floor(Date.now() / 1000 - uptime)}:R>\n` +
        "**Version:** `" +
        process.env.npm_package_version +
        "`\n" +
        "**Latency:** `" +
        Math.round(client.ws.ping) +
        "ms`\n"
    );

  await interaction.editReply({ embeds: [embed] });
}
