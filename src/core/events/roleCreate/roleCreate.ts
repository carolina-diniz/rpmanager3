import { Role } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";
import print from "../../print/print";
import { emitBuffered } from "../services";

export default async (role: Role) => {
  print.init(__filename);

  const guildDb = await modelGuild.findOne({ id: role.guild.id });

  if (!guildDb) return;

  guildDb.roles.set(role.id, {
    id: role.id,
    name: role.name,
    rawPosition: role.rawPosition,
    EntryManager: false,
    ApprovedMember: false,
  });

  await guildDb.save().then(() => {
    emitBuffered('roleSaved', role.id)
  });
};
