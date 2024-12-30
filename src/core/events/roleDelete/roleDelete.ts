import { Role } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";
import print from "../../print/print";

export default async (role: Role) => {
  print.init(__filename)
  
  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  if (!guildDb) return;

  guildDb.roles.delete(role.id);

  await guildDb.save();
};
