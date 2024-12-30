import { REST, Routes } from "discord.js";
import commands from "../commands/commands";
import print from "../print/print";

export default async (clientId: string, guild: { id: string; name: string }) => {
  print.init(__filename);
  try {
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
    const rest: REST = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
    const commandsData = Object.values(commands).map((command) => command.data);
    let data: any = await rest.put(Routes.applicationGuildCommands(clientId, guild.id), {
      body: commandsData,
    });

    print.log(__filename, `${data.length} commands successfully deployed to ${guild.name}`);
  } catch (error) {
    print.error(__filename, "Error deploying commands:", error);
  }
};
