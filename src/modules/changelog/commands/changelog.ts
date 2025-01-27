import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import print from "../../../core/print/print";

export const data = new SlashCommandBuilder()
  .setName("changelog")
  .setDescription("View the latest changes to the bot.");

export async function execute(interaction: CommandInteraction) {
  try {
    const adminUsers = ["175468439979163648", "1175849378074861572"];

    if (!adminUsers.includes(interaction.user.id)) {
      return interaction.reply({
        content: "Você não possui permissão para usar este comando.",
        ephemeral: true,
      });
    }

    const modal = new ModalBuilder().setCustomId("modal_changelog").setTitle("CHANGELOG");

    const version = new TextInputBuilder()
      .setCustomId("changelog_input_version")
      .setLabel("Versão")
      .setPlaceholder("Ex: 1.0.0")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const changes = new TextInputBuilder()
      .setCustomId("changelog_input_changes")
      .setLabel("Alterações")
      .setPlaceholder("Digite as alterações introduzidas na nova versão.")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(version);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(changes);

    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
  } catch (error) {
    print.error(
      __filename,
      "error ao executar comando changelog",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
