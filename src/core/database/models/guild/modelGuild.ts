import { ChannelType } from "discord.js";
import mongoose, { Schema } from "mongoose";
import { ModelGuild } from "./modelGuild.type";

const channelSchema = {
  id: String,
  name: String,
  type: ChannelType,
  parentId: String,
  position: Number,
  isEntryChannel: Boolean,
  isApprovalChannel: Boolean,
  isPermaDeathChannel: Boolean,
};

const rolesSchema = {
  id: String,
  name: String,
  rawPosition: Number,
  isApprover: Boolean,
  isEntryRole: Boolean,
};

const invitesSchema = {
  code: String,
};

const membersSchema = {
  id: String,
  guildId: String,
  username: String,
  displayName: String,
  nickname: String || null,
  joinedAt: Date || null,
  kickable: Boolean,
  manageable: Boolean,
  moderatable: Boolean,
  bannable: Boolean,
}

const schema: Schema<ModelGuild> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  memberCount: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  botRawPosition: {
    type: Number,
    required: true,
  },
  channels: {
    type: Map,
    of: channelSchema,
  },
  roles: {
    type: Map,
    of: rolesSchema,
  },
  invites: {
    type: Map,
    of: invitesSchema,
  },
  members: {
    type: Map,
    of: membersSchema,
  }
});

export default mongoose.model("guild3", schema);
