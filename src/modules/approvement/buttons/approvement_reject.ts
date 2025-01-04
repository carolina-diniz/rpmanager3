import { ButtonInteraction, EmbedBuilder, GuildMember } from "discord.js";
import print from "../../../core/print/print";
import { getTarget } from "./approvement_approve";

export async function execute(interaction: ButtonInteraction) {
  try {
    const embed = new EmbedBuilder(interaction.message.embeds[0]!.data);
    const target = await getTarget(interaction);
    const staff = await interaction.guild?.members.fetch(interaction.user.id);

    await setNickname(interaction, target, embed);

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

async function setNickname(
  interaction: ButtonInteraction,
  target: GuildMember,
  embed: EmbedBuilder
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await target.setNickname(`Entrada Rejeitada | ${target.user.globalName}`);
      resolve(`Entrada Rejeitada | ${target.user.globalName}`);
    } catch (error) {
      embed
        .setTitle("MISSING PERMISSIONS")
        .setDescription(
          `O bot não possui **PERMISSÃO** para alterar o **APELIDO** do  usuário <@${target.user.id}>!`
        )
        .setColor("Yellow");
      await interaction.update({ embeds: [embed] });

      reject("Error setting nickname");
    }
  });
}
