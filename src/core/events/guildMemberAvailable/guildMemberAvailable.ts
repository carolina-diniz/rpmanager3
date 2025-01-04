import { GuildMember, PartialGuildMember } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";

export default async (member: GuildMember | PartialGuildMember) => {
  try {
    print.init(__filename);

    const guildDb = await database.get("guild", member.guild);

    const memberDb = guildDb?.members.get(member.id);

    if (!memberDb) return;

    memberDb.username = member.user.username;
    memberDb.displayName = member.user.displayName;
    memberDb.nickname = member.nickname;
    memberDb.kickable = member.kickable;
    memberDb.manageable = member.manageable;
    memberDb.moderatable = member.moderatable;
    memberDb.bannable = member.bannable;

    guildDb?.members.set(member.id, memberDb);

    await guildDb?.save();

    print.log(__filename, `updating member: ${member.user.username}`, member.guild, member.user);
  } catch (error) {
    print.error(__filename, error);
  }
};
