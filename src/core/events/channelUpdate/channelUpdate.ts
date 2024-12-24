import { DMChannel, NonThreadGuildBasedChannel } from "discord.js";
import modelGuild from "../../database/models/guild/modelGuild";

export default async (
  oldChannel: DMChannel | NonThreadGuildBasedChannel,
  newChannel: DMChannel | NonThreadGuildBasedChannel
) => {
  console.log("[EVENT] (channelUpdate)");

  if (newChannel.isDMBased()) return;

  const guildDb = await modelGuild.findOne({ id: newChannel.guildId });

  if (!guildDb) return;

  const channelDb = guildDb.channels.get(newChannel.id);

  if (!channelDb) return;

  (channelDb.name = newChannel.name),
    (channelDb.parentId = newChannel.parentId),
    (channelDb.position = newChannel.position),
    guildDb.channels.set(newChannel.id, channelDb);

  await guildDb.save();
};
