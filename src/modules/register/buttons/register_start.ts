import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import { ButtonInteraction, ModalBuilder, TextInputStyle } from "discord.js";
import getChannelsCreated from "../services/getChannelsCreated";
import getRolesCreated from "../services/getRolesCreated";

export async function execute(interaction: ButtonInteraction) {
  try {
    const channelsCreated = await getChannelsCreated(interaction.guild!);
    const rolesCreated = await getRolesCreated(interaction.guild!);

    if (!channelsCreated.isApprovalChannelCreated) {
      await interaction.reply({
        content: "Canal de aprovação não foi criado, use o comando /register para criar o canal de aprovação.",
        ephemeral: true,
      });
      return;
    }

    if(!rolesCreated.ApprovedMember) {
      await interaction.reply({
        content: "Cargo de membro aprovado não foi criado, use o comando /register para criar o cargo de membro aprovado.",
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder()
      .setCustomId("register_start")
      .setTitle(`REGISTRO - ${interaction.guild?.name.toUpperCase()}`);

    const name = new TextInputBuilder()
      .setCustomId("register_input_name")
      .setLabel("Nome Completo")
      .setPlaceholder("Digite seu nome do jogo")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMinLength(2)
      .setMaxLength(20);

    const id = new TextInputBuilder()
      .setCustomId("register_input_id")
      .setLabel("ID do Jogo")
      .setRequired(true)
      .setPlaceholder("Digite seu ID do jogo (F11)")
      .setMinLength(1)
      .setMaxLength(7)
      .setStyle(TextInputStyle.Short);

    const recruiter = new TextInputBuilder()
      .setCustomId("register_input_recruiter")
      .setLabel("ID do Recrutador")
      .setRequired(true)
      .setPlaceholder("Digite o ID de quem está te recrutando")
      .setMinLength(1)
      .setMaxLength(20)
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(id);
    const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(recruiter);

    modal.addComponents(row1, row2, row3);
    await interaction.showModal(modal);
  } catch (error) {
    console.error(error);
  }
}
