import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { genericPageContent } from "../../../../modules/genericPage";
import print from "../../../print/print";

export async function execute(interaction: ButtonInteraction) {
  print.init(__filename);
  const oldEmbed = interaction.message.embeds[0];

  if (!oldEmbed) return;

  const pagePath = oldEmbed.footer!.text.split("/");
  const pageName = pagePath[pagePath.length - 2] as keyof typeof genericPageContent;

  const title = genericPageContent[pageName].title;
  const description = genericPageContent[pageName].description;
  const footer = genericPageContent[pageName].footer;
  const buttons = genericPageContent[pageName].buttons;

  const embed = new EmbedBuilder().setTitle(title).setDescription(description).setFooter(footer);

  await interaction.update({ embeds: [embed], components: [await buttons(interaction)] });
}
