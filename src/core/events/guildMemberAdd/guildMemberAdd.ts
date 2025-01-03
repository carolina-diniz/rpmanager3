import { GuildMember } from "discord.js";
import { membersSchema } from "../../database";
import database from "../../database/database";
import print from "../../print/print";

export default async (member: GuildMember) => {
  try {
    print.init(__filename);

    const guildDb = await database.get("guild", member.guild);

    const memberData: membersSchema = {
      id: member.id,
      username: member.user.username,
      displayName: member.user.displayName,
      nickname: member.nickname,
      joinedAt: member.joinedAt,
      kickable: member.kickable,
      manageable: member.manageable,
      moderatable: member.moderatable,
      bannable: member.bannable,
    };

    guildDb?.members.set(member.id, memberData);

    await guildDb?.save();
  } catch (error) {
    print.error(__filename, error);
  }
};
