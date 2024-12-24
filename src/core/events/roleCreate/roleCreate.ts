import { Role } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (role: Role) => {
  console.log("[EVENT] (roleCreate)");

  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  if (!guildDb) return;

  guildDb.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    isModerator: false,
    isEntryRole: false,
  });

  await guildDb.save();
};
