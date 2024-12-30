import { ButtonInteraction } from "discord.js";
import print from "../../../print/print";

export async function execute(interaction: ButtonInteraction) {
  print.init(__filename)
  await interaction.message.delete();
}
