import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import print from "../../../core/print/print";
import { genericPageContent } from "../../genericPage";

export const data = new SlashCommandBuilder()
  .setName("recruitment")
  .setDescription("recruitment");

export async function execute(interaction: CommandInteraction) {
  print.init(__filename);

  await interaction.deferReply();

  const { title, description, footer, buttons } =
    genericPageContent.recruitment;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer);

  console.log(embed)

  await interaction.editReply({ embeds: [embed], components: [await buttons(interaction)] });
}
