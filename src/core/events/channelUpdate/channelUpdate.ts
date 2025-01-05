import { DMChannel, NonThreadGuildBasedChannel } from "discord.js";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";

export default async (
  oldChannel: DMChannel | NonThreadGuildBasedChannel,
  newChannel: DMChannel | NonThreadGuildBasedChannel
) => {
  try {
    print.init(__filename);

    if (newChannel.isDMBased()) return;

    const guildDb = await modelGuild.findOne({ id: newChannel.guild.id });
    const channelDb = guildDb?.channels.get(newChannel.id);
    if (!channelDb) return;

    channelDb.name = newChannel.name;
    channelDb.parentId = newChannel.parentId;
    channelDb.position = newChannel.position;

    guildDb?.channels.set(newChannel.id, channelDb);

    await guildDb?.save();

    print.log(__filename, `Channel ${newChannel.name} updated`, newChannel.guild);
  } catch (error) {
    print.error(__filename, null, error, newChannel.isDMBased() ? null : newChannel.guild, undefined, newChannel);
  }
};
