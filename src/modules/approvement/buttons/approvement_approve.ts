import { ButtonInteraction, EmbedBuilder, Guild, GuildMember, Role } from "discord.js";
import database from "../../../core/database/database";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";
import { ApprovementService } from "../services";

export async function execute(interaction: ButtonInteraction) {
  try {
    const embed = new EmbedBuilder(interaction.message.embeds[0]!.data);
    const target = await ApprovementService.getTarget(interaction.message.content, interaction.guild!, embed);
    const staff = await interaction.guild?.members.fetch(interaction.user.id);
    const entryRole = await getEntryRole(interaction.guild!);

    const gameId = interaction.message.embeds[0].fields.filter((data) => data.name === "ID")[0].value;

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

    const nickname = await setNickname(interaction, target, embed).catch((error) =>
      print.error(__filename, error)
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
      //components: [],
    });
  } catch (error) {
    print.error(__filename, error);
  }
}

async function addMotoclubRole(interaction: ButtonInteraction, target: GuildMember, embed: EmbedBuilder) {
  try {
    const motoclubgg = await interaction.guild?.roles.fetch("1254791457450102835"); // Motoclub GG

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

async function getEntryRole(guild: Guild): Promise<Role | null> {
  const guildDb = await database.get("guild", guild);
  let entryRole = "";

  guildDb?.roles.forEach((roles) => {
    if (roles.ApprovedMember) {
      entryRole = roles.id;
    }
  });

  if (entryRole) {
    return await guild.roles.fetch(entryRole);
  }

  return null;
}

export async function setNickname(
  interaction: ButtonInteraction,
  target: GuildMember,
  embed: EmbedBuilder
): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    let name = interaction.message.embeds[0].fields.filter((data) => data.name === "Nome")[0].value;
    let gameId = interaction.message.embeds[0].fields.filter((data) => data.name === "ID")[0].value;
    const names = name.trim().split(" ");

    if (names.length > 1) {
      const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
      const lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();
      name = `${firstName} ${lastName}`;
    }

    const guildDb = await modelGuild.findOne({ id: interaction.guild!.id });
    const prefixRole = guildDb?.prefix!;

    try {
      await target.setNickname(`${prefixRole} ${name} | ${gameId}`);
      resolve([name, gameId, `${prefixRole} ${name} | ${gameId}`]);
    } catch (error) {
      embed
        .setTitle("MISSING PERMISSIONS")
        .setDescription(
          `O bot não possui **PERMISSÃO** para alterar o **APELIDO** do  usuário <@${target.user.id}>!`
        )
        .setColor("Yellow");

      reject([name, gameId]);
    }
  });
}

export async function getTarget(interaction: ButtonInteraction): Promise<GuildMember> {
  return new Promise(async (resolve, reject) => {
    try {
      const targetId = interaction.message.content.replace("||<@", "").replace(">||", "");
      const target = await interaction.guild!.members.fetch(targetId);
      if (!target) throw new Error("Target not found");
      resolve(target);
    } catch (error) {
      const embed = new EmbedBuilder(interaction.message.embeds[0]!.data)
        .setTitle("ENTRADA REJEITADA")
        .setDescription("O usuário não foi encontrado na lista de membros do servidor.")
        .setColor("Red");

      await interaction.update({ embeds: [embed!], components: [] });
      reject(error);
    }
  });
}
