import { ButtonInteraction, ColorResolvable, EmbedBuilder, Guild, GuildMember, Message } from "discord.js";
import { approvementContent } from "../buttons/content";

export const interactionCache = new Map<string, ButtonInteraction>();

export const ApprovementService = {
  getTarget: async (message: Message<boolean>, guild: Guild, embed: EmbedBuilder): Promise<GuildMember> => {
    try {
      const targetId = message.content.replace(/\D/g, "");
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
};
