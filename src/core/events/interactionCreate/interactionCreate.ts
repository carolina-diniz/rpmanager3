import { CacheType, Interaction } from "discord.js";
import { buttons } from "../../buttons/buttons";
import commands from "../../commands/commands";
import print from "../../print/print";
import { submit } from "../../submit";

export default async (interaction: Interaction<CacheType>) => {
  try {
    print.init(__filename);

    if (interaction.isCommand()) {
      const { commandName } = interaction;
  
      if (commandName in commands) {
        print.log(__filename, `[command] (${commandName}) <user: ${interaction.user.username}>`);
        await commands[commandName as keyof typeof commands].execute(interaction);
      }
    }
  
    if (interaction.isButton()) {
      const { customId } = interaction;
  
      if (customId in buttons) {
        print.log(__filename, `Button: ${customId} user: ${interaction.user.displayName}`);
        await buttons[customId as keyof typeof buttons].execute(interaction);
      }
    }
  
    if (interaction.isModalSubmit()) {
      const { customId } = interaction;
  
      if (customId in submit) {
        print.log(__filename, `Modal Submit: ${customId} user: ${interaction.user.displayName}`);
        await submit[customId as keyof typeof submit].execute(interaction);
      }
    }
  } catch (error) {
    print.error(__filename, error);
  }
};
