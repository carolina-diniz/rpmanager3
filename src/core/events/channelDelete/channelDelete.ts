import { DMChannel, GuildChannel } from "discord.js";
import print from "../../print/print";
import guildService from "../services/guild.service";

export default async (channel: DMChannel | GuildChannel) => {
  print.init(__filename);

  if (channel.isDMBased()) return;

  const guildDb = await guildService.getAtDatabase(channel.guildId);

  guildDb?.channels.delete(channel.id);

  await guildDb?.save();
};
