import { NonThreadGuildBasedChannel } from "discord.js";
import { channelsSchema } from "../../database";
import print from "../../print/print";
import { emitBuffered } from "../services";
import guildService from "../services/guild.service";

export default async (channel: NonThreadGuildBasedChannel) => {
  print.init(__filename);

  const guildDb = await guildService.getAtDatabase(channel.guildId);

  const channelData: channelsSchema = {
    id: channel.id,
    name: channel.name,
    type: channel.type,
    parentId: channel.parentId,
    position: channel.position,
    isEntryChannel: false,
    isApprovalChannel: false,
    isPermaDeathChannel: false,
  };

  guildDb?.channels.set(channel.id, channelData);

  await guildDb?.save().then(() => {
    emitBuffered("channelSaved", channel.id);
  });
};
