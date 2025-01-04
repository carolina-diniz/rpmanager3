import { NonThreadGuildBasedChannel } from "discord.js";
import { channelsSchema } from "../../database";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";
import { emitBuffered } from "../services";

export default async (channel: NonThreadGuildBasedChannel) => {
  print.init(__filename);

  const guildDb = await modelGuild.findOne({ id: channel.guild.id });

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
    print.log(__filename, `Channel ${channel.name} saved`, channel.guild);
  });
};
