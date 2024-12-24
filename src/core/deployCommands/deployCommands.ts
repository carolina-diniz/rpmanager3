import { REST, Routes } from "discord.js";
import commands from "../commands/commands";

export default async (clientId: string, guild: { id: string; name: string }) => {
  try {
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
    const rest: REST = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
    const commandsData = Object.values(commands).map((command) => command.data);
    let data: any = await rest.put(Routes.applicationGuildCommands(clientId, guild.id), {
      body: commandsData,
    });

    console.log(`${data.length} commands successfully deployed to ${guild.name}`);
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
}