import { GuildMember, PartialGuildMember } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";

export default async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
  try {
    print.init(__filename);

    const guildDb = await database.get("guild", newMember.guild);

    const memberDb = guildDb?.members.get(newMember.id);

    if (!memberDb) return;

    memberDb.username = newMember.user.username;
    memberDb.displayName = newMember.user.displayName;
    memberDb.nickname = newMember.nickname;
    memberDb.kickable = newMember.kickable;
    memberDb.manageable = newMember.manageable;
    memberDb.moderatable = newMember.moderatable;
    memberDb.bannable = newMember.bannable;

    guildDb?.members.set(newMember.id, memberDb);

    await guildDb?.save();
  } catch (error) {
    print.error(__filename, error);
  }
};
