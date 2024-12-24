import { GuildMember, PartialGuildMember } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (member: GuildMember | PartialGuildMember) => {
  console.log("[EVENT] (guildMemberRemove)");

  const guildDb = await modelGuild.findOne({ id: member.guild.id });

  guildDb?.members.delete(member.id);

  await guildDb?.save();
};
