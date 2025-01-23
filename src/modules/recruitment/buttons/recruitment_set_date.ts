import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import print from "../../../core/print/print";

export async function execute(interaction: ButtonInteraction) {
  try {
    const modal = new ModalBuilder()
      .setCustomId("recruitment_set_date")
      .setTitle("Lista de recrutadores");

    const initalDate = new TextInputBuilder()
      .setCustomId("recruitment_initial_date")
      .setLabel("Data de Início")
      .setPlaceholder("Ex.: 01/01/2022")
      .setMinLength(10)
      .setMaxLength(10)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const endDate = new TextInputBuilder()
      .setCustomId("recruitment_end_date")
      .setLabel("Data de Término")
      .setPlaceholder("Ex.: 31/12/2022")
      .setMinLength(10)
      .setMaxLength(10)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(initalDate);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(endDate);

    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
  } catch (error) {
    print.error(
      __filename,
      "Error while executing the button interaction",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
