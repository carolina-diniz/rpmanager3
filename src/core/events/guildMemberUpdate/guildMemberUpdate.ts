import { GuildMember, PartialGuildMember } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
  console.log("[EVENT] (guildMemberUpdate)");
  const guildDb = await modelGuild.findOne({ id: newMember.guild.id });

  if (!guildDb) return;

  const memberDb = guildDb.members.get(newMember.id);

  if (!memberDb) return;

  memberDb.username = newMember.user.username;
  memberDb.displayName = newMember.user.displayName;
  memberDb.nickname = newMember.nickname;
  memberDb.kickable = newMember.kickable;
  memberDb.manageable = newMember.manageable;
  memberDb.moderatable = newMember.moderatable;
  memberDb.bannable = newMember.bannable;

  guildDb.members.set(newMember.id, memberDb);

  await guildDb.save();
};
