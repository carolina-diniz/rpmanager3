import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  CommandInteraction,
} from "discord.js";
import buttonConstructor from "../../../core/buttons/buttonConstructor";

export default {
  title: "Top 10 Recrutadores",
  description: "Lista os 10 recrutadores mais ativos:",
  footer: {
    text: "recruitment",
  },
  buttons,
};

async function buttons(
  interaction: CommandInteraction | ButtonInteraction
): Promise<ActionRowBuilder<ButtonBuilder>> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    buttonConstructor({
      customId: "recruitment_set_date",
      label: "Inserir Data",
      emoji: "🗓️",
      disabled: false,
    })
  );
}
