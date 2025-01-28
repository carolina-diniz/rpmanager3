import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle, CommandInteraction, SlashCommandBuilder } from "discord.js";
import print from "../../../core/print/print";

export const data = new SlashCommandBuilder()
  .setName("ticket")
  .setDescription("cria configuração para novo ticket");

export async function execute(interaction: CommandInteraction) {
  try {
    const embed = new EmbedBuilder()
      .setTitle("titulo")
      .setDescription("descrição")
      .setFooter({ text: interaction.user.id });

    const editTitle = new ButtonBuilder()
      .setCustomId("ticket_edit_title")
      .setLabel("Editar Título")
      .setStyle(ButtonStyle.Primary);

    const editDescription = new ButtonBuilder()
      .setCustomId("ticket_edit_description")
      .setLabel("Editar Descrição")
      .setStyle(ButtonStyle.Primary);

    const addSupportRole = new ButtonBuilder()
      .setCustomId("ticket_add_support_role")
      .setLabel("Adicionar Cargo de Suporte")
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(editTitle, editDescription);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(addSupportRole);

    await interaction.reply({ embeds: [embed], components: [row1, row2], ephemeral: true });
  } catch (error) {
    print.error(
      __filename,
      "error ao executar o comando ticket",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
