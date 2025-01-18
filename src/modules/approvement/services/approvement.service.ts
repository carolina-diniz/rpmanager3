import {
  ButtonInteraction,
  ColorResolvable,
  EmbedBuilder,
  Guild,
  GuildMember,
  Message,
  Role,
} from "discord.js";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import { approvementContent } from "../buttons/content";

export const interactionCache = new Map<string, ButtonInteraction>();

export const ApprovementService = {
  getTarget: async (messageContent: string, guild: Guild, embed: EmbedBuilder): Promise<GuildMember> => {
    try {
      const targetId = messageContent.replace(/\D/g, "");
      const target = await guild.members.fetch(targetId);

      if (!target) {
        throw new Error("Target not found");
      }

      return target;
    } catch (error) {
      await ApprovementService.updateEmbed(approvementContent.user_not_found, "", embed);
      throw error;
    }
  },

  getStaff: async (staffId: string, guild: Guild): Promise<GuildMember> => {
    try {
      return await guild.members.fetch(staffId);
    } catch (error) {
      throw error;
    }
  },

  updateEmbed: async (
    content: {
      title: string;
      description: string | null;
      color: ColorResolvable;
      footer?: { text: string; iconURL: string };
    },
    optional: string | null,
    embed: EmbedBuilder,
    staff?: GuildMember
  ): Promise<void> => {
    const interaction = interactionCache.get("interaction");
    const { title, description, color, footer } = content;

    if (footer && staff) {
      embed.setFooter({
        text: footer.text.replace("$$", staff.nickname ?? staff.user.username),
        iconURL: footer.iconURL.replace("$$", staff.displayAvatarURL()),
      });
    }

    const updatedDescription = description?.replace("$$", optional || "") || null;

    embed.setTitle(title).setDescription(updatedDescription).setColor(color);

    await interaction?.update({ embeds: [embed] });
  },

  setNickname: async (entry: "approved" | "reject", member: GuildMember, message?: Message<boolean>) => {
    let nickName = "unknown";

    if (entry === "approved") {
      let name = message?.embeds[0].fields.filter((data) => data.name === "Nome")[0].value;
      let gameId = message?.embeds[0].fields.filter((data) => data.name === "ID")[0].value;
      const names = name?.trim().split(" ");

      if (names && names.length > 1) {
        const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
        const lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();
        name = `${firstName} ${lastName}`;
      }

      const guildDb = await modelGuild.findOne({ id: message?.guild?.id });
      const prefixRole = guildDb?.prefix!;

      nickName = `${prefixRole} ${name} | ${gameId}`;
    }

    if (entry === "reject") {
      nickName = `Entrada Rejeitada | ${member.user.globalName}`;
    }

    try {
      await member.setNickname(nickName);
      return nickName;
    } catch (error) {
      throw error;
    }
  },

  getUsefullGuildRoles: async (guildId: string): Promise<{ entryRole: string }> => {
    const guildDb = await modelGuild.findOne({ id: guildId });
    let entryRole = "";

    guildDb?.roles.forEach((roles) => {
      if (roles.ApprovedMember) {
        entryRole = roles.id;
      }
    });

    return {
      entryRole,
    };
  },

  getRole: async (roleId: string, guild: Guild): Promise<Role | null> => {
    return await guild.roles.fetch(roleId);
  },
};
