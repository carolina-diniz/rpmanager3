import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";

type channelCreatedResolvedType = {
  isEntryChannelCreated: boolean;
  isApprovalChannelCreated: boolean;
  isPermaDeathChannelCreated: boolean;
};

export default async (guildId: string): Promise<channelCreatedResolvedType> => {
  print.init(__filename);

  const channelsCreatedResolved: channelCreatedResolvedType = {
    isEntryChannelCreated: false,
    isApprovalChannelCreated: false,
    isPermaDeathChannelCreated: false,
  };

  const guildDb = await modelGuild.findOne({ id: guildId });

  if (!guildDb) {
    print.log(__filename, "Guild not found");
    return channelsCreatedResolved;
  }

  guildDb.channels.forEach((channel) => {
    if (channel.isEntryChannel) {
      channelsCreatedResolved.isEntryChannelCreated = true;
    }
    if (channel.isApprovalChannel) {
      channelsCreatedResolved.isApprovalChannelCreated = true;
    }
    if (channel.isPermaDeathChannel) {
      channelsCreatedResolved.isPermaDeathChannelCreated = true;
    }
  });

  return channelsCreatedResolved;
};
