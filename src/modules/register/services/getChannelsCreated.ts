import database from "../../../core/database/database";
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

  const guildDb = await database.get("guild", { id: guildId });

  guildDb?.channels.forEach((channel) => {
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
