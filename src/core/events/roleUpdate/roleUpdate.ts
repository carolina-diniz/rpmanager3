import { Role } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (oldRole: Role) => {
  const role = await oldRole.guild.roles.fetch(oldRole.id);
  if (!role) return;

  console.log(`[EVENT] (roleUpdate) name: ${role.name}`);

  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  const roleData = guildDb?.roles.get(role.id);

  if (!guildDb || !roleData) return;

  guildDb.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    isModerator: roleData.isModerator,
    isEntryRole: roleData.isEntryRole,
  });

  await guildDb.save();
};
