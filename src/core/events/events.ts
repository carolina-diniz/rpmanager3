import { Client } from "discord.js";
import { client } from "../../connections";
import print from "../print/print";
import channelCreate from "./channelCreate/channelCreate";
import channelDelete from "./channelDelete/channelDelete";
import channelUpdate from "./channelUpdate/channelUpdate";
import guildAvailable from "./guildAvailable/guildAvailable";
import guildCreate from "./guildCreate/guildCreate";
import guildDelete from "./guildDelete/guildDelete";
import guildMemberAdd from "./guildMemberAdd/guildMemberAdd";
import guildMemberAvailable from "./guildMemberAvailable/guildMemberAvailable";
import guildMemberRemove from "./guildMemberRemove/guildMemberRemove";
import guildMemberUpdate from "./guildMemberUpdate/guildMemberUpdate";
import interactionCreate from "./interactionCreate/interactionCreate";
import messageCreate from "./messageCreate/messageCreate";
import roleCreate from "./roleCreate/roleCreate";
import roleDelete from "./roleDelete/roleDelete";
import roleUpdate from "./roleUpdate/roleUpdate";

export default {
  listen: () => {
    print.init(__filename);

    try {
      logger(client);

      client
        .once("ready", () => {})
        .on("applicationCommandPermissionsUpdate", () => {})
        .on("autoModerationActionExecution", () => {})
        .on("autoModerationRuleCreate", () => {})
        .on("autoModerationRuleDelete", () => {})
        .on("autoModerationRuleUpdate", () => {})
        .on("channelCreate", channelCreate)
        .on("channelDelete", channelDelete)
        .on("channelPinsUpdate", () => {})
        .on("channelUpdate", channelUpdate)
        .on("debug", () => {})
        .on("emojiCreate", () => {})
        .on("emojiDelete", () => {})
        .on("emojiUpdate", () => {})
        .on("entitlementCreate", () => {})
        .on("entitlementDelete", () => {})
        .on("entitlementUpdate", () => {})
        .on("error", () => {})
        .on("guildAuditLogEntryCreate", () => {})
        .on("guildAvailable", guildAvailable)
        .on("guildBanAdd", () => {})
        .on("guildBanRemove", () => {})
        .on("guildCreate", guildCreate)
        .on("guildDelete", guildDelete)
        .on("guildIntegrationsUpdate", () => {})
        .on("guildMemberAdd", guildMemberAdd)
        .on("guildMemberAvailable", guildMemberAvailable)
        .on("guildMemberRemove", guildMemberRemove)
        .on("guildMembersChunk", () => {})
        .on("guildMemberUpdate", guildMemberUpdate)
        .on("guildScheduledEventCreate", () => {})
        .on("guildScheduledEventDelete", () => {})
        .on("guildScheduledEventUpdate", () => {})
        .on("guildScheduledEventUserAdd", () => {})
        .on("guildScheduledEventUserRemove", () => {})
        .on("guildUnavailable", () => {})
        .on("guildUpdate", () => {})
        .on("interactionCreate", interactionCreate)
        .on("inviteCreate", () => {})
        .on("inviteDelete", () => {})
        .on("messageCreate", messageCreate)
        .on("messageDelete", () => {})
        .on("messageDeleteBulk", () => {})
        .on("messagePollVoteAdd", () => {})
        .on("messagePollVoteRemove", () => {})
        .on("messageReactionAdd", () => {})
        .on("messageReactionRemove", () => {})
        .on("messageReactionRemoveAll", () => {})
        .on("messageReactionRemoveEmoji", () => {})
        .on("messageUpdate", () => {})
        .on("presenceUpdate", () => {})
        .on("roleCreate", roleCreate)
        .on("roleDelete", roleDelete)
        .on("roleUpdate", roleUpdate)
        .on("shardDisconnect", () => {})
        .on("shardError", () => {})
        .on("shardReady", () => {})
        .on("shardReconnecting", () => {})
        .on("shardResume", () => {})
        .on("stageInstanceCreate", () => {})
        .on("stageInstanceDelete", () => {})
        .on("stageInstanceUpdate", () => {})
        .on("stickerCreate", () => {})
        .on("stickerDelete", () => {})
        .on("stickerUpdate", () => {})
        .on("threadCreate", () => {})
        .on("threadDelete", () => {})
        .on("threadListSync", () => {})
        .on("threadMembersUpdate", () => {})
        .on("threadMemberUpdate", () => {})
        .on("threadUpdate", () => {})
        .on("typingStart", () => {})
        .on("userUpdate", () => {})
        .on("voiceStateUpdate", () => {})
        .on("warn", () => {})
        .on("webhooksUpdate", () => {})
        .on("webhookUpdate", () => {});
    } catch (error) {
      print.error(__filename, "error while listening to events", error);
    }
  },
};

function logger(client: Client<boolean>) {
  client
    .on("ready", () => {
      print.log(__filename, "ready");
    })
    .on("applicationCommandPermissionsUpdate", () => {
      print.log(__filename, "applicationCommandPermissionsUpdate");
    })
    .on("autoModerationActionExecution", () => {
      print.log(__filename, "autoModerationActionExecution");
    })
    .on("autoModerationRuleCreate", () => {
      print.log(__filename, "autoModerationRuleCreate");
    })
    .on("autoModerationRuleDelete", () => {
      print.log(__filename, "autoModerationRuleDelete");
    })
    .on("autoModerationRuleUpdate", () => {
      print.log(__filename, "autoModerationRuleUpdate");
    })
    .on("channelCreate", () => {
      print.log(__filename, "channelCreate");
    })
    .on("channelDelete", () => {
      print.log(__filename, "channelDelete");
    })
    .on("channelPinsUpdate", () => {
      print.log(__filename, "channelPinsUpdate");
    })
    .on("channelUpdate", () => {
      print.log(__filename, "channelUpdate");
    })
    .on("debug", (message: string) => {
      print.warn(__filename, "debug", message);
    })
    .on("emojiCreate", () => {
      print.log(__filename, "emojiCreate");
    })
    .on("emojiDelete", () => {
      print.log(__filename, "emojiDelete");
    })
    .on("emojiUpdate", () => {
      print.log(__filename, "emojiUpdate");
    })
    .on("entitlementCreate", () => {
      print.log(__filename, "entitlementCreate");
    })
    .on("entitlementDelete", () => {
      print.log(__filename, "entitlementDelete");
    })
    .on("entitlementUpdate", () => {
      print.log(__filename, "entitlementUpdate");
    })
    .on("error", (error: Error) => {
      print.error(__filename, "error", error);
    })
    .on("guildAuditLogEntryCreate", () => {
      print.log(__filename, "guildAuditLogEntryCreate");
    })
    .on("guildAvailable", () => {
      print.log(__filename, "guildAvailable");
    })
    .on("guildBanAdd", () => {
      print.log(__filename, "guildBanAdd");
    })
    .on("guildBanRemove", () => {
      print.log(__filename, "guildBanRemove");
    })
    .on("guildCreate", () => {
      print.log(__filename, "guildCreate");
    })
    .on("guildDelete", () => {
      print.log(__filename, "guildDelete");
    })
    .on("guildIntegrationsUpdate", () => {
      print.log(__filename, "guildIntegrationsUpdate");
    })
    .on("guildMemberAdd", () => {
      print.log(__filename, "guildMemberAdd");
    })
    .on("guildMemberAvailable", () => {
      print.log(__filename, "guildMemberAvailable");
    })
    .on("guildMemberRemove", () => {
      print.log(__filename, "guildMemberRemove");
    })
    .on("guildMembersChunk", () => {
      print.log(__filename, "guildMembersChunk");
    })
    .on("guildMemberUpdate", () => {
      print.log(__filename, "guildMemberUpdate");
    })
    .on("guildScheduledEventCreate", () => {
      print.log(__filename, "guildScheduledEventCreate");
    })
    .on("guildScheduledEventDelete", () => {
      print.log(__filename, "guildScheduledEventDelete");
    })
    .on("guildScheduledEventUpdate", () => {
      print.log(__filename, "guildScheduledEventUpdate");
    })
    .on("guildScheduledEventUserAdd", () => {
      print.log(__filename, "guildScheduledEventUserAdd");
    })
    .on("guildScheduledEventUserRemove", () => {
      print.log(__filename, "guildScheduledEventUserRemove");
    })
    .on("guildUnavailable", () => {
      print.log(__filename, "guildUnavailable");
    })
    .on("guildUpdate", () => {
      print.log(__filename, "guildUpdate");
    })
    .on("interactionCreate", () => {
      print.log(__filename, "interactionCreate");
    })
    .on("inviteCreate", () => {
      print.log(__filename, "inviteCreate");
    })
    .on("inviteDelete", () => {
      print.log(__filename, "inviteDelete");
    })
    .on("messageCreate", () => {
      print.log(__filename, "messageCreate");
    })
    .on("messageDelete", () => {
      print.log(__filename, "messageDelete");
    })
    .on("messageDeleteBulk", () => {
      print.log(__filename, "messageDeleteBulk");
    })
    .on("messagePollVoteAdd", () => {
      print.log(__filename, "messagePollVoteAdd");
    })
    .on("messagePollVoteRemove", () => {
      print.log(__filename, "messagePollVoteRemove");
    })
    .on("messageReactionAdd", () => {
      print.log(__filename, "messageReactionAdd");
    })
    .on("messageReactionRemove", () => {
      print.log(__filename, "messageReactionRemove");
    })
    .on("messageReactionRemoveAll", () => {
      print.log(__filename, "messageReactionRemoveAll");
    })
    .on("messageReactionRemoveEmoji", () => {
      print.log(__filename, "messageReactionRemoveEmoji");
    })
    .on("messageUpdate", () => {
      print.log(__filename, "messageUpdate");
    })
    .on("presenceUpdate", () => {
      print.log(__filename, "presenceUpdate");
    })
    .on("roleCreate", () => {
      print.log(__filename, "roleCreate");
    })
    .on("roleDelete", () => {
      print.log(__filename, "roleDelete");
    })
    .on("roleUpdate", () => {
      print.log(__filename, "roleUpdate");
    })
    .on("shardDisconnect", () => {
      print.log(__filename, "shardDisconnect");
    })
    .on("shardError", () => {
      print.log(__filename, "shardError");
    })
    .on("shardReady", () => {
      print.log(__filename, "shardReady");
    })
    .on("shardReconnecting", () => {
      print.log(__filename, "shardReconnecting");
    })
    .on("shardResume", () => {
      print.log(__filename, "shardResume");
    })
    .on("stageInstanceCreate", () => {
      print.log(__filename, "stageInstanceCreate");
    })
    .on("stageInstanceDelete", () => {
      print.log(__filename, "stageInstanceDelete");
    })
    .on("stageInstanceUpdate", () => {
      print.log(__filename, "stageInstanceUpdate");
    })
    .on("stickerCreate", () => {
      print.log(__filename, "stickerCreate");
    })
    .on("stickerDelete", () => {
      print.log(__filename, "stickerDelete");
    })
    .on("stickerUpdate", () => {
      print.log(__filename, "stickerUpdate");
    })
    .on("threadCreate", () => {
      print.log(__filename, "threadCreate");
    })
    .on("threadDelete", () => {
      print.log(__filename, "threadDelete");
    })
    .on("threadListSync", () => {
      print.log(__filename, "threadListSync");
    })
    .on("threadMembersUpdate", () => {
      print.log(__filename, "threadMembersUpdate");
    })
    .on("threadMemberUpdate", () => {
      print.log(__filename, "threadMemberUpdate");
    })
    .on("threadUpdate", () => {
      print.log(__filename, "threadUpdate");
    })
    .on("typingStart", () => {
      print.log(__filename, "typingStart");
    })
    .on("userUpdate", () => {
      print.log(__filename, "userUpdate");
    })
    .on("voiceStateUpdate", () => {
      print.log(__filename, "voiceStateUpdate");
    })
    .on("warn", () => {
      print.log(__filename, "warn");
    })
    .on("webhooksUpdate", () => {
      print.log(__filename, "webhooksUpdate");
    })
    .on("webhookUpdate", () => {
      print.log(__filename, "webhookUpdate");
    });
}
