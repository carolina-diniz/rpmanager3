import { ChannelType } from "discord.js";

export interface channelsSchema {
  id: string;
  name: string;
  type: ChannelType;
  parentId: string | null;
  position: number;
  isEntryChannel: boolean;
  isApprovalChannel: boolean;
  isPermaDeathChannel: boolean;
}

export interface rolesSchema {
  id: string;
  name: string;
  rawPosition: number;
  EntryManager: boolean;
  ApprovedMember: boolean;
}

export interface invitesSchema {
  code: string;
}

export interface membersSchema {
  id: string;
  username: string;
  displayName: string;
  nickname: string | null;
  joinedAt: Date | null;
  kickable: boolean;
  manageable: boolean;
  moderatable: boolean;
  bannable: boolean;
}

export interface ModelGuild {
  id: string;
  name: string;
  memberCount: number;
  ownerId: string;
  prefix: string;
  color: string | null;
  botRawPosition: number;
  channels: Map<string, channelsSchema>;
  roles: Map<string, rolesSchema>;
  invites: Map<string, invitesSchema>;
  members: Map<string, membersSchema>;
}
