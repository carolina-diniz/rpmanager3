import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle, ModalSubmitInteraction } from "discord.js";
import print from "../../../core/print/print";

export async function execute(interaction: ModalSubmitInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { fields, channel } = interaction;

    if (!channel || !channel.isSendable() || !channel.isTextBased()) return;

    const data = {
      name: fields.getTextInputValue("action_input_name"),
      date: fields.getTextInputValue("action_input_date"),
      hour: fields.getTextInputValue("action_input_hour"),
      membersqt: fields.getTextInputValue("action_input_membersqt"),
    };

    if (data.date.split('/').length !== 3 ) {
      return await interaction.editReply({ content: 'Data inválida' });
    }

    if (data.hour.split(':').length !== 2) {
      return await interaction.editReply({ content: 'Hora inválida' });
    }

    const eventDateArray = data.date.split("/");

    const eventDate = new Date(`${eventDateArray[1]}/${eventDateArray[0]}/${eventDateArray[2]} ${data.hour}`);

    const embed = new EmbedBuilder()
      .setTitle("AÇÃO MARCADA")
      .setDescription(
        `\n**${data.name}**\n\n` +
          `Clique no botão para adicionar seu nome.\n` +
          `Caso você adicione seu nome e não compareça ao evento, estará sujeito a uma advertência.\n\n` +
          `Começa <t:${Math.floor(eventDate.getTime() / 1000)}:R>.`
      )
      .setFields(
        { name: "Data", value: `\`\`\`${data.date}\`\`\``, inline: true },
        { name: "Hora", value: `\`\`\`${data.hour}\`\`\``, inline: true },
        { name: "ㅤ", value: "ㅤ", inline: true },
        { name: "Participantes", value: `\`\`\`${data.membersqt}\`\`\``, inline: true },
        { name: "ㅤ", value: "ㅤ", inline: true }
      )
      .setTimestamp(eventDate.getTime());

    const embedFollowUp = new EmbedBuilder()
      .setTitle("Nomes")
      .setDescription("Nenhum nome foi adicionado.");

    const participar = new ButtonBuilder()
      .setCustomId("action_join")
      .setLabel("Participar")
      .setEmoji({
        name: "🔫",
        animated: false,
      })
      .setStyle(ButtonStyle.Primary);

    const sair = new ButtonBuilder()
      .setCustomId("action_left")
      .setLabel("Sair")
      .setEmoji({
        name: "✖️",
        animated: false,
      })
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(participar, sair);

    await channel.send({
      content: "|| @everyone @here ||",
      embeds: [embed, embedFollowUp],
      components: [row],
    });

    await interaction.deleteReply();
  } catch (error) {
    print.error(
      __filename,
      "erro ao executar action modal submit",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
