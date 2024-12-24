import { DMChannel, GuildChannel } from "discord.js";
import guildService from "../services/guild.service";

export default async (channel: DMChannel | GuildChannel) => {
  console.log("[EVENT] (channelDelete)");

  if (channel.isDMBased()) return;

  const guildDb = await guildService.getAtDatabase(channel.guildId);

  guildDb?.channels.delete(channel.id);

  await guildDb?.save();
};
