import { ButtonInteraction, EmbedBuilder, GuildMember } from "discord.js";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";
import { ApprovementService } from "../services";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { user, guild, message } = interaction;

    const embed = new EmbedBuilder(message.embeds[0]!.data);
    const target = await ApprovementService.getTarget(message.content, guild!, embed);
    const staff = await ApprovementService.getStaff(user.id, guild!);
    const usefullGuildRoles = await ApprovementService.getUsefullGuildRoles(guild!.id);
    const entryRole = await ApprovementService.getRole(usefullGuildRoles.entryRole, guild!);

    const gameId = message.embeds[0].fields.filter((data) => data.name === "ID")[0].value;

    if (!entryRole) {
      embed
        .setTitle("CARGO ENTRY NÃO ENCONTRADO")
        .setDescription(`Não é possível concluir a interação!\nCargo de entrada não foi encontrado.`)
        .setColor("Yellow");
      await interaction.update({ embeds: [embed] });

      throw new Error("Role not found");
    }

    await target.roles.add(entryRole).catch(async (error) => {
      print.error(__filename, "Error adding role to member");

      embed
        .setTitle("MISSING PERMISSIONS")
        .setDescription(
          `O bot não possui **PERMISSÃO** para adicionar o **CARGO** <@&${entryRole.id}> ao usuário <@${target.user.id}>!`
        )
        .setColor("Yellow");

      await interaction.update({ embeds: [embed] });

      throw new Error("Missing permission to add role to member");
    });

    if (interaction.guild?.id === "1254790639284125748") {
      await addMotoclubRole(interaction, target, embed);
    }

    const nickname = await ApprovementService.setNickname("approved", target, interaction.message).catch(
      (error) => print.error(__filename, error)
    );

    if (nickname) {
      embed
        .setTitle("ENTRADA APROVADA")
        .setDescription(null)
        .setColor("Green")
        .setFooter({
          text: `Aprovado por: ${staff?.nickname ?? interaction.user.globalName}`,
          iconURL: staff?.displayAvatarURL(),
        });
    }

    await updateMember(target, gameId);

    await interaction.update({
      embeds: [embed],
      components: [],
    });
  } catch (error) {
    print.error(__filename, error);
  }
}

async function addMotoclubRole(interaction: ButtonInteraction, target: GuildMember, embed: EmbedBuilder) {
  try {
    const motoclubgg = await ApprovementService.getRole("1254791457450102835", interaction.guild!); // Motoclub GG

    if (!motoclubgg) {
      throw new Error('Role "Motoclub GG" not found');
    }

    await target.roles.add(motoclubgg).catch(async () => {
      throw new Error("Missing permission to add role to member");
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role "Motoclub GG" not found') {
      embed
        .setTitle("CARGO MOTOCLUB NÃO ENCONTRADO")
        .setDescription(`Não é possível concluir a interação!\nCargo de motoclub não foi encontrado.`)
        .setColor("Yellow");

      await interaction.update({ embeds: [embed] });
    }
    if (error instanceof Error && error.message === "Missing permission to add role to member") {
      print.error(__filename, "Error adding role to member");

      embed
        .setTitle("MISSING PERMISSIONS")
        .setDescription(
          `O bot não possui **PERMISSÃO** para adicionar o **CARGO** <@&1254791457450102835> ao usuário <@${target.user.id}>!`
        )
        .setColor("Yellow");

      await interaction.update({ embeds: [embed] });
    }
  }
}

async function updateMember(member: GuildMember, gameId: string) {
  const guildDb = await modelGuild.findOne({ id: member.guild.id });
  const regex = /^[0-9]+$/;

  const memberDb = guildDb?.members.get(member.id);

  if (memberDb) {
    memberDb.approvedMember = true;

    if (regex.test(gameId)) {
      memberDb.gameId = gameId;
    }

    guildDb?.members.set(member.id, memberDb);
    await guildDb?.markModified("members");
  }

  await guildDb?.save();
}
