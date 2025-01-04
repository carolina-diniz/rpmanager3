import { Guild, GuildChannelManager, RoleManager } from "discord.js";
import { Document, Types } from "mongoose";
import { client } from "../../../connections";
import { channelsSchema, invitesSchema, membersSchema, ModelGuild, rolesSchema } from "../../database";
import modelGuild from "../../database/models/guilds/modelGuild";
import print from "../../print/print";

export type modelGuild = Document<unknown, {}, ModelGuild> &
  ModelGuild & { _id: Types.ObjectId } & { __v: number };

export default {
  createAtDatabase: async (guild: Guild) => {
    print.init(__filename)
    const { id, name, memberCount, ownerId, channels, roles } = guild;

    const [channelMap, roleMap, inviteMap, membersMap, bot] = await Promise.all([
      createChannelMap(channels),
      createRoleMap(roles),
      createInviteMap(guild),
      createMemberMap(guild),
      guild.members.fetch(client.user!.id),
    ]);

    const guildData = {
      id,
      name,
      memberCount,
      ownerId,
      prefix: "[N]",
      color: null,
      botRawPosition: bot.roles.highest.rawPosition,
      channels: channelMap,
      roles: roleMap,
      gameId: null,
      invites: inviteMap,
      members: membersMap,
    };

    await modelGuild.create(guildData);
  },
  deleteAtDatabase: async (guild: Guild) => {
    await modelGuild.deleteOne({ id: guild.id });
  },
  getAtDatabase: async (guildId: Guild | string | null) => {
    if (!guildId) return null;
    const id = typeof guildId === "string" ? guildId : guildId.id;
    return await modelGuild.findOne({ id });
  },
};

async function createChannelMap(channels: GuildChannelManager): Promise<Map<string, channelsSchema>> {
  const channelMap = new Map();

  (await channels.fetch()).map((channel) => {
    if (channel) {
      const data: channelsSchema = {
        id: channel.id,
        name: channel.name,
        type: channel.type,
        parentId: channel.parentId,
        position: channel.position,
        isEntryChannel: false,
        isApprovalChannel: false,
        isPermaDeathChannel: false,
      };

      channelMap.set(channel.id, data);
    }
  });

  return channelMap;
}

async function createRoleMap(roles: RoleManager): Promise<Map<string, rolesSchema>> {
  const roleMap = new Map();

  (await roles.fetch()).map((role) => {
    if (role) {
      const data = {
        id: role.id,
        name: role.name,
        rawPosition: role.rawPosition,
        EntryManager: false,
        ApprovedMember: false,
      };

      roleMap.set(role.id, data);
    }
  });

  return roleMap;
}

export async function createInviteMap(guild: Guild): Promise<Map<string, invitesSchema>> {
  const inviteMap = new Map();

  (await guild.invites.fetch()).map((invite) => {
    if (invite) {
      const data = {
        code: invite.code,
      };

      inviteMap.set(invite.code, data);
    }
  });

  return inviteMap;
}

export async function createMemberMap(guild: Guild): Promise<Map<string, membersSchema>> {
  const memberMap = new Map();

  (await guild.members.fetch()).map((member) => {
    if (member) {
      const data = {
        id: member.id,
        username: member.user.username,
        displayName: member.user.displayName,
        nickname: member.nickname,
        joinedAt: member.joinedAt,
        kickable: member.kickable,
        manageable: member.manageable,
        moderatable: member.moderatable,
        bannable: member.bannable,
        gameId: null,
        entryManager: false,
        approvedMember: false,
      };

      memberMap.set(member.id, data);
    }
  });

  return memberMap;
}
