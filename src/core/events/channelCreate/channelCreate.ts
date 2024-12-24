import { NonThreadGuildBasedChannel } from "discord.js";
import { channelsSchema } from "../../database";
import guildService from "../services/guild.service";

export default async (channel: NonThreadGuildBasedChannel) => {
  console.log("[EVENT] (channelCreate)");

  const guildDb = await guildService.getAtDatabase(channel.guildId);

  const channelData: channelsSchema = {
      id: channel.id,
      name: channel.name,
      type: channel.type,
      parentId: channel.parentId,
      position: channel.position,
      isEntryChannel: false,
      isModeratorChannel: false,
      isPermaDeathChannel: false,
  }

  guildDb?.channels.set(channel.id, channelData);

  await guildDb?.save();
}