import { Role } from "discord.js";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";

export default async (oldRole: Role) => {
  print.init(__filename);

  const role = await oldRole.guild.roles.fetch(oldRole.id);
  if (!role) return;

  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  const roleData = guildDb?.roles.get(role.id);

  if (!guildDb || !roleData) return;

  guildDb.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    EntryManager: roleData.EntryManager,
    ApprovedMember: roleData.ApprovedMember,
  });

  await guildDb.save();
};
