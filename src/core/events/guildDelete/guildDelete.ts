import { Guild } from "discord.js";
import guildService from "../services/guild.service";

export default async (guild: Guild) => {
  console.log(`[EVENT] (guildDelete) name: ${guild.name}`);
  
  await guildService.deleteAtDatabase(guild);
};
