import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import print from "../../../core/print/print";

export const data = new SlashCommandBuilder()
  .setName("action")
  .setDescription("Cria um botão para criar ações!");

export async function execute(interaction: CommandInteraction) {
  try {
    const { guild, user } = interaction;

    const member = await guild?.members.fetch(user.id);

    if (!member?.permissions.has("Administrator")) {
      return interaction.reply({ content: "Você não possui permissão de administrador.", ephemeral: true });
    }

    const modal = new ModalBuilder().setCustomId("action_commmand").setTitle("CRIADOR DE AÇÕES");

    const nameInput = new TextInputBuilder()
      .setCustomId("action_input_name")
      .setLabel("Nome da Ação")
      .setPlaceholder("Ex: Banco Central")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const dateInput = new TextInputBuilder()
      .setCustomId("action_input_date")
      .setLabel("Data")
      .setPlaceholder("Ex: 03/12/2024")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const hourInput = new TextInputBuilder()
      .setCustomId("action_input_hour")
      .setLabel("Hora")
      .setPlaceholder("Ex: 22:30")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const membersqtInput = new TextInputBuilder()
      .setCustomId("action_input_membersqt")
      .setLabel("Participantes")
      .setPlaceholder("Quantidade de participantes. Ex: 10")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const ln1: any = new ActionRowBuilder().addComponents(nameInput);
    const ln2: any = new ActionRowBuilder().addComponents(dateInput);
    const ln3: any = new ActionRowBuilder().addComponents(hourInput);
    const ln4: any = new ActionRowBuilder().addComponents(membersqtInput);

    modal.addComponents(ln1, ln2, ln3, ln4);

    await interaction.showModal(modal);
  } catch (error) {
    print.error(
      __filename,
      "error ao executar o comando action",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
