import { ButtonInteraction, EmbedBuilder } from "discord.js";
import print from "../../../core/print/print";
import { ApprovementService } from "../services";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { message, guild, user, channel } = interaction;

    const embed = new EmbedBuilder(message.embeds[0]!.data);
    const target = await ApprovementService.getTarget(message.content, guild!, embed);
    const staff = await ApprovementService.getStaff(user.id, guild!)

    try {
      await ApprovementService.setNickname('reject', target)
    } catch (error) {
      print.error(__filename, `falha ao mudar nickname de ${target.id}`, error, guild, target.user, channel);
    }

    embed
      .setTitle("ENTRADA REJEITADA")
      .setDescription(null)
      .setColor("Red")
      .setFooter({
        text: `Reprovado por: ${staff?.nickname ?? interaction.user.globalName}`,
        iconURL: staff?.displayAvatarURL(),
      });

    await interaction.update({
      embeds: [embed],
      components: [],
    });
  } catch (error) {
    print.error(__filename, error);
  }
}
