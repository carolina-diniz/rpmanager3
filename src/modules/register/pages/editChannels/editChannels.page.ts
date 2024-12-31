import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import buttonConstructor from "../../../../core/buttons/buttonConstructor";
import buttonsList from "../../../../core/buttons/buttonsList";

const { general } = buttonsList;

export default {
  title: "📂 Editar Canais",
  description:
    "Aqui você pode editar os canais do sistema de registro:\n\n" +
    "- Canal de Registro: Escolha um novo canal onde os usuários enviarão as informações de seus personagens.\n\n" +
    "- Canal de Aprovação: Escolha um novo canal onde os moderadores poderão aprovar ou reprovar solicitações.\n\n" +
    "Utilize os botões abaixo para editar os canais ou voltar à configuração principal.",
  footer: {
    text: "home/editChannels",
  },
  buttons: async (interaction: CommandInteraction | ButtonInteraction): Promise<ActionRowBuilder<ButtonBuilder>> => {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      buttonConstructor({
        customId: "editchannels_editregister",
        label: "Canal de Registro",
        emoji: "📝",
      }),
      buttonConstructor({
        customId: "editchannels_editapproval",
        label: "Canal de Aprovação",
        emoji: "✅",
      }),
      general.back,
      general.close
    );
  },
};
