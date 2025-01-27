import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import print from "../../../core/print/print";

export async function execute(interaction: ModalSubmitInteraction) {
  try {
    await interaction.deferReply();

    const {} = interaction;

    const data = {
      version: interaction.fields.getTextInputValue("changelog_input_version"),
      changes: interaction.fields.getTextInputValue("changelog_input_changes"),
    };

    const embed = new EmbedBuilder()
      .setTitle("UPDATES")
      .setDescription(`\n**v${data.version}**\n\n` + `${data.changes}`);

    if (interaction.channel?.isTextBased() && interaction.channel?.isSendable()) {
      await interaction.channel.send({ embeds: [embed] });
    }

    await interaction.deleteReply();
  } catch (error) {
    print.error(
      __filename,
      "error ao executar modal submit changelog",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
