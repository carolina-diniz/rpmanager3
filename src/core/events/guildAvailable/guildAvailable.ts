import { Guild } from "discord.js";
import { client } from "../../../connections";
import storage from "../../../storage";
import modelGuild from "../../database/models/guild/modelGuild";
import deployCommands from "../../deployCommands/deployCommands";
import print from "../../print/print";
import guildService, { createInviteMap } from "../services/guild.service";

export default async (guild: Guild) => {
  print.init(__filename);

  const { id, name, memberCount, ownerId } = guild;

  const guildDb = await guildService.getAtDatabase(guild);
  const inviteMap = await createInviteMap(guild);
  const bot = await guild.members.fetch(client.user!.id);

  if (await storage.remoteConfig.deployCommands()) {
    print.log(__filename, `deploying commands to guild: ${guild.name}`);
    await deployCommands(client.user!.id, { id, name });
  }

  if (!guildDb) {
    print.log(__filename, `creating new guild: ${guild.name}`);
    await modelGuild.findOne({ id: guild.id });
    return;
  }

  print.log(__filename, `updating guild: ${guild.name}`);
  (guildDb.name = name),
    (guildDb.memberCount = memberCount),
    (guildDb.ownerId = ownerId),
    (guildDb.botRawPosition = bot.roles.highest.rawPosition),
    (guildDb.invites = inviteMap),
    await guildDb.save();
};
