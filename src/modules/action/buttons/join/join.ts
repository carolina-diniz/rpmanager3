import { ButtonInteraction, EmbedBuilder } from "discord.js";
import print from "../../../../core/print/print";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { message, guild, user } = interaction;

    const member = await guild?.members.fetch(user.id);

    if (!message.embeds[0] || !message.embeds[1]) {
      return await interaction.reply({ content: 'Parece que está faltando algo...'});
    }

    const embed1 = new EmbedBuilder(message.embeds[0].data)
    const embed2 = new EmbedBuilder(message.embeds[1].data)

    let description = embed2.data.description;

    if (member && description?.includes(member.id)) {
      return await interaction.reply({ content: '## CALMA LÁ, AMIGO!\nVocê já colocou seu nome na lista!', ephemeral: true });
    }

    if (!description?.includes('@')) {
      description = ''
    }

    embed2.setDescription(`${description}\n1. <@${member?.id}>`)

    await interaction.update({ embeds: [embed1, embed2] });

  } catch (error) {
    print.error(
      __filename,
      "erro ao executar join button",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
