import { Guild } from "discord.js";
import print from "../../print/print";
import guildService from "../services/guild.service";

export default async (guild: Guild) => {
  print.init(__filename);

  await guildService.deleteAtDatabase(guild);

  print.log(__filename, `deleting guild: ${guild.name}`, guild);
};
