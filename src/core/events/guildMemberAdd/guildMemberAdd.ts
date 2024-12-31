import { GuildMember } from "discord.js";
import { membersSchema } from "../../database";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";

export default async (member: GuildMember) => {
  print.init(__filename)

  const guildDb = await modelGuild.findOne({ id: member.guild.id });

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
};
