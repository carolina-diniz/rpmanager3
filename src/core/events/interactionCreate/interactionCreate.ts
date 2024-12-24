import { CacheType, Interaction } from "discord.js";
import commands from "../../commands/commands";

export default async (interaction: Interaction<CacheType>) => {
  console.log("[EVENT] (interactionCreate)");

  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName in commands) {
      console.log(`[command] (${commandName}) <user: ${interaction.user.username}>`);
      await commands[commandName as keyof typeof commands].execute(interaction);
    }
  }

  // if (interaction.isButton()) {
  //   const { customId } = interaction;

  //   console.log(`Button: ${customId} user: ${interaction.user.displayName}`);

  //   if (customId in buttons) {
  //     await buttons[customId as keyof typeof buttons].execute(interaction as ButtonInteraction);
  //   }
  // }

  // if (interaction.isModalSubmit()) {
  //   const { customId } = interaction;

  //   console.log(`Modal Submit: ${customId} user: ${interaction.user.displayName}`);

  //   if (customId in submit) {
  //     await submit[customId as keyof typeof submit].execute(interaction);
  //   }
  // }
};
