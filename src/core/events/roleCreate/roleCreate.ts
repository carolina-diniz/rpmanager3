import { Role } from "discord.js";
import database from "../../database/database";
import print from "../../print/print";
import { emitBuffered } from "../services";

export default async (role: Role) => {
  print.init(__filename);

  const guildDb = await database.get("guild", role.guild);

  guildDb?.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    EntryManager: false,
    ApprovedMember: false,
  });

  await guildDb?.save().then(() => {
    emitBuffered("roleSaved", role.id);
    print.log(__filename, `adding role: ${role.name}`, role.guild);
  });
};
