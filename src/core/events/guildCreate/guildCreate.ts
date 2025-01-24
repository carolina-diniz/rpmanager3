import { Guild } from "discord.js";
import print from "../../print/print";
import guildService from "../services/guild.service";
import { client } from "../../../connections";
import deployCommands from "../../deployCommands/deployCommands";

export default async (guild: Guild) => {
  print.init(__filename);
  const { id, name } = guild;
  
  await guildService.createAtDatabase(guild);

  await deployCommands(client.user!.id, { id, name });

  print.log(__filename, `creating new guild: ${guild.name}`, guild);
};
