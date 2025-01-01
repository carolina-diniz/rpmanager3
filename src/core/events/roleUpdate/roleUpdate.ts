import { Role } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";

export default async (oldRole: Role) => {
  print.init(__filename);

  const role = await oldRole.guild.roles.fetch(oldRole.id);

  if (!role) return;

  const guildDb = await database.get("guild", role.guild);

  const roleData = guildDb?.roles.get(role.id);

  if (!roleData) return;

  guildDb?.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    EntryManager: roleData.EntryManager,
    ApprovedMember: roleData.ApprovedMember,
  });

  await guildDb?.save();
};
