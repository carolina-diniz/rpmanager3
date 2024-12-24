import { Role } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (role: Role) => {
  console.log(`[EVENT] (roleDelete) name: ${role.name}`);
  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  if (!guildDb) return;

  guildDb.roles.delete(role.id);

  await guildDb.save();
};
