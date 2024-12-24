import { client } from "../../connections";
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
    console.log("starting to listen to events");

    try {
      client
        .once("ready", () => {
          console.log("[EVENT] (ready)");
        })
        .on("applicationCommandPermissionsUpdate", () => {
          console.log("[EVENT] (applicationCommandPermissionsUpdate)");
        })
        .on("autoModerationActionExecution", () => {
          console.log("[EVENT] (autoModerationActionExecution)");
        })
        .on("autoModerationRuleCreate", () => {
          console.log("[EVENT] (autoModerationRuleCreate)");
        })
        .on("autoModerationRuleDelete", () => {
          console.log("[EVENT] (autoModerationRuleDelete)");
        })
        .on("autoModerationRuleUpdate", () => {
          console.log("[EVENT] (autoModerationRuleUpdate)");
        })
        .on("channelCreate", channelCreate)
        .on("channelDelete", channelDelete)
        .on("channelPinsUpdate", () => {
          console.log("[EVENT] (channelPinsUpdate)");
        })
        .on("channelUpdate", channelUpdate)
        .on("debug", (message: string) => {
          console.log("[EVENT] (debug)", message);
        })
        .on("emojiCreate", () => {
          console.log("[EVENT] (emojiCreate)");
        })
        .on("emojiDelete", () => {
          console.log("[EVENT] (emojiDelete)");
        })
        .on("emojiUpdate", () => {
          console.log("[EVENT] (emojiUpdate)");
        })
        .on("entitlementCreate", () => {
          console.log("[EVENT] (entitlementCreate)");
        })
        .on("entitlementDelete", () => {
          console.log("[EVENT] (entitlementDelete)");
        })
        .on("entitlementUpdate", () => {
          console.log("[EVENT] (entitlementUpdate)");
        })
        .on("error", (error: Error) => {
          console.log("[EVENT] (error)");
          console.log("**************");
          console.log(error);
          console.log("**************");
        })
        .on("guildAuditLogEntryCreate", () => {
          console.log("[EVENT] (guildAuditLogEntryCreate)");
        })
        .on("guildAvailable", guildAvailable)
        .on("guildBanAdd", () => {
          console.log("[EVENT] (guildBanAdd)");
        })
        .on("guildBanRemove", () => {
          console.log("[EVENT] (guildBanRemove)");
        })
        .on("guildCreate", guildCreate)
        .on("guildDelete", guildDelete)
        .on("guildIntegrationsUpdate", () => {
          console.log("[EVENT] (guildIntegrationsUpdate)");
        })
        .on("guildMemberAdd", guildMemberAdd)
        .on("guildMemberAvailable", guildMemberAvailable)
        .on("guildMemberRemove", guildMemberRemove)
        .on("guildMembersChunk", () => {
          console.log("[EVENT] (guildMembersChunk)");
        })
        .on("guildMemberUpdate", guildMemberUpdate)
        .on("guildScheduledEventCreate", () => {
          console.log("[EVENT] (guildScheduledEventCreate)");
        })
        .on("guildScheduledEventDelete", () => {
          console.log("[EVENT] (guildScheduledEventDelete)");
        })
        .on("guildScheduledEventUpdate", () => {
          console.log("[EVENT] (guildScheduledEventUpdate)");
        })
        .on("guildScheduledEventUserAdd", () => {
          console.log("[EVENT] (guildScheduledEventUserAdd)");
        })
        .on("guildScheduledEventUserRemove", () => {
          console.log("[EVENT] (guildScheduledEventUserRemove)");
        })
        .on("guildUnavailable", () => {
          console.log("[EVENT] (guildUnavailable)");
        })
        .on("guildUpdate", () => {
          console.log("[EVENT] (guildUpdate)");
        })
        .on("interactionCreate", interactionCreate)
        .on("inviteCreate", () => {
          console.log("[EVENT] (inviteCreate)");
        })
        .on("inviteDelete", () => {
          console.log("[EVENT] (inviteDelete)");
        })
        .on("messageCreate", messageCreate)
        .on("messageDelete", () => {
          console.log("[EVENT] (messageDelete)");
        })
        .on("messageDeleteBulk", () => {
          console.log("[EVENT] (messageDeleteBulk)");
        })
        .on("messagePollVoteAdd", () => {
          console.log("[EVENT] (messagePollVoteAdd)");
        })
        .on("messagePollVoteRemove", () => {
          console.log("[EVENT] (messagePollVoteRemove)");
        })
        .on("messageReactionAdd", () => {
          console.log("[EVENT] (messageReactionAdd)");
        })
        .on("messageReactionRemove", () => {
          console.log("[EVENT] (messageReactionRemove)");
        })
        .on("messageReactionRemoveAll", () => {
          console.log("[EVENT] (messageReactionRemoveAll)");
        })
        .on("messageReactionRemoveEmoji", () => {
          console.log("[EVENT] (messageReactionRemoveEmoji)");
        })
        .on("messageUpdate", () => {
          console.log("[EVENT] (messageUpdate)");
        })
        .on("presenceUpdate", () => {
          console.log("[EVENT] (presenceUpdate)");
        })
        .on("roleCreate", roleCreate)
        .on("roleDelete", roleDelete)
        .on("roleUpdate", roleUpdate)
        .on("shardDisconnect", () => {
          console.log("[EVENT] (shardDisconnect)");
        })
        .on("shardError", () => {
          console.log("[EVENT] (shardError)");
        })
        .on("shardReady", () => {
          console.log("[EVENT] (shardReady)");
        })
        .on("shardReconnecting", () => {
          console.log("[EVENT] (shardReconnecting)");
        })
        .on("shardResume", () => {
          console.log("[EVENT] (shardResume)");
        })
        .on("stageInstanceCreate", () => {
          console.log("[EVENT] (stageInstanceCreate)");
        })
        .on("stageInstanceDelete", () => {
          console.log("[EVENT] (stageInstanceDelete)");
        })
        .on("stageInstanceUpdate", () => {
          console.log("[EVENT] (stageInstanceUpdate)");
        })
        .on("stickerCreate", () => {
          console.log("[EVENT] (stickerCreate)");
        })
        .on("stickerDelete", () => {
          console.log("[EVENT] (stickerDelete)");
        })
        .on("stickerUpdate", () => {
          console.log("[EVENT] (stickerUpdate)");
        })
        .on("threadCreate", () => {
          console.log("[EVENT] (threadCreate)");
        })
        .on("threadDelete", () => {
          console.log("[EVENT] (threadDelete)");
        })
        .on("threadListSync", () => {
          console.log("[EVENT] (threadListSync)");
        })
        .on("threadMembersUpdate", () => {
          console.log("[EVENT] (threadMembersUpdate)");
        })
        .on("threadMemberUpdate", () => {
          console.log("[EVENT] (threadMemberUpdate)");
        })
        .on("threadUpdate", () => {
          console.log("[EVENT] (threadUpdate)");
        })
        .on("typingStart", () => {
          console.log("[EVENT] (typingStart)");
        })
        .on("userUpdate", () => {
          console.log("[EVENT] (userUpdate)");
        })
        .on("voiceStateUpdate", () => {
          console.log("[EVENT] (voiceStateUpdate)");
        })
        .on("warn", () => {
          console.log("[EVENT] (warn)");
        })
        .on("webhooksUpdate", () => {
          console.log("[EVENT] (webhooksUpdate)");
        })
        .on("webhookUpdate", () => {
          console.log("[EVENT] (webhookUpdate)");
        });
    } catch (error) {
      console.error("error while listening to events", error);
    }
  },
};
