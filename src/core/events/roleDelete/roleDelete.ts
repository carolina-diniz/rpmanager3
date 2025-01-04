import { Role } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";

export default async (role: Role) => {
  print.init(__filename);

  const guildDb = await database.get("guild", role.guild);

  guildDb?.roles.delete(role.id);

  await guildDb?.save();

  print.log(__filename, `deleting role: ${role.name}`, role.guild);
};
