import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { genericPageContent } from ".";
import print from "../../core/print/print";

export async function execute(interaction: ButtonInteraction ) {
  print.init(__filename)

  const genericPageKey = interaction.customId.split("_")[1];

  const { title, description, footer, buttons } =
    genericPageContent[genericPageKey as keyof typeof genericPageContent];

  const embed = new EmbedBuilder().setTitle(title).setDescription(description).setFooter(footer);

  await interaction.update({ embeds: [embed], components: [await buttons(interaction)] });
}
