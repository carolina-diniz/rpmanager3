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
    const { message, user, showModal, reply } = interaction;

    const authorId = message.embeds[0].footer?.text;

    if (user.id !== authorId) {
      return reply({ content: "Você não é o criador deste ticket!" });
    }

    const modal = new ModalBuilder().setCustomId("edit_ticket_description_modal").setTitle("Edição de Ticket");

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description_input")
      .setLabel("Descrição")
      .setPlaceholder("Digite a nova descrição do ticket")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(1500);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);

    modal.addComponents(row1);

    await showModal(modal);
  } catch (error) {
    print.error(
      __filename,
      "error ao executar botão de edição da descrição do ticket",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
