import { GuildMember, PartialGuildMember } from "discord.js";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";

export default async (member: GuildMember | PartialGuildMember) => {
  print.init(__filename)

  const guildDb = await modelGuild.findOne({ id: member.guild.id });

  if (!guildDb) return;

  const memberDb = guildDb.members.get(member.id);

  if (!memberDb) return;

  memberDb.username = member.user.username;
  memberDb.displayName = member.user.displayName;
  memberDb.nickname = member.nickname;
  memberDb.kickable = member.kickable;
  memberDb.manageable = member.manageable;
  memberDb.moderatable = member.moderatable;
  memberDb.bannable = member.bannable;

  guildDb.members.set(member.id, memberDb);

  await guildDb.save();
};
