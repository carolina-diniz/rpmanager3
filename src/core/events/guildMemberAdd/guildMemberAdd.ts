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
      gameId: null,
      entryManager: false,
      approvedMember: false,
    };

    guildDb?.members.set(member.id, memberData);

    await guildDb?.save();

    print.log(__filename, `adding member: ${member.user.username}`, member.guild, member.user);
  } catch (error) {
    print.error(__filename, error);
  }
};
