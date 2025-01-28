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
    const { message, user, } = interaction;

    const authorId = message.embeds[0].footer?.text;

    if (user.id !== authorId) {
      return interaction.reply({ content: "Você não é o criador deste ticket!" });
    }

    const modal = new ModalBuilder().setCustomId("edit_ticket_title_modal").setTitle("Edição de Ticket");

    const titleInput = new TextInputBuilder()
      .setCustomId("title_input")
      .setLabel("Título")
      .setPlaceholder("Digite o novo título do ticket")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMinLength(2)
      .setMaxLength(30);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);

    modal.addComponents(row1);

    await interaction.showModal(modal);
  } catch (error) {
    print.error(
      __filename,
      "error ao executar botão de edição do título do ticket",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
