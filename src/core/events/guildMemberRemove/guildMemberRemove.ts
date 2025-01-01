import { GuildMember, PartialGuildMember } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";

export default async (member: GuildMember | PartialGuildMember) => {
  try {
    print.init(__filename);

    const guildDb = await database.get("guild", member.guild);

    guildDb?.members.delete(member.id);

    await guildDb?.save();
  } catch (error) {
    print.error(__filename, error);
  }
};
