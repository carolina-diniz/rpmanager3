import { GuildMember, PartialGuildMember } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";
import print from "../../print/print";

export default async (member: GuildMember | PartialGuildMember) => {
  print.init(__filename)

  const guildDb = await modelGuild.findOne({ id: member.guild.id });

  guildDb?.members.delete(member.id);

  await guildDb?.save();
};
