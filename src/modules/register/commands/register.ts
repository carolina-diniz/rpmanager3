import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import print from "../../../core/print/print";
import { genericPageContent } from "../../genericPage";

export const data = new SlashCommandBuilder()
  .setName("register")
  .setDescription("Register your account with the bot.");

export async function execute(interaction: CommandInteraction) {
  print.init(__filename);

  const member = await interaction.guild?.members.fetch(interaction.user.id);

  if (!member?.permissions.has("Administrator")) {
    print.log(
      __filename,
      "User does not have the required permissions to use this command.",
      interaction.guild,
      member?.user
    );

    return interaction.reply({
      content: "You do not have the required permissions to use this command.",
      ephemeral: true,
    });
  }

  await interaction.deferReply();

  const { title, description, footer, buttons } = genericPageContent.home;

  const embed = new EmbedBuilder().setTitle(title).setDescription(description).setFooter(footer);

  await interaction.editReply({ embeds: [embed], components: [await buttons(interaction)] });
}
