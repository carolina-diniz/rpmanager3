import { Guild } from "discord.js";
import { client } from "../../../connections";
import storage from "../../../storage";
import deployCommands from "../../deployCommands/deployCommands";
import guildService, { createInviteMap } from "../services/guild.service";

export default async (guild: Guild) => {
  console.log(`[EVENT] (guildAvailable) name: ${guild.name}`);

  const { id, name, memberCount, ownerId } = guild;

  const guildDb = await guildService.getAtDatabase(guild);
  const inviteMap = await createInviteMap(guild);
  const bot = await guild.members.fetch(client.user!.id);

  if (await storage.remoteConfig.deployCommands()) {
    console.log(`[guildAvailable] deploying commands to guild: ${guild.name}`);
    await deployCommands(client.user!.id, { id, name });
  }

  if (!guildDb) {
    console.log(`[guildAvailable] creating new guild: ${guild.name}`);
    await guildService.createAtDatabase(guild);
    return;
  }

  console.log(`[guildAvailable] updating guild: ${guild.name}`);
  (guildDb.name = name),
    (guildDb.memberCount = memberCount),
    (guildDb.ownerId = ownerId),
    (guildDb.botRawPosition = bot.roles.highest.rawPosition),
    (guildDb.invites = inviteMap),
    await guildDb.save();
};
