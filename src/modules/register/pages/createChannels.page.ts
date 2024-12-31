import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import buttonConstructor from "../../../core/buttons/buttonConstructor";
import buttonsList from "../../../core/buttons/buttonsList";
import getChannelsCreated from "../services/getChannelsCreated";
const { general } = buttonsList;

export default {
  title: "📂 Criar Canais",
  description:
    "Aqui você pode criar os canais necessários para o sistema de registro:\n\n" +
    "- Canal de Registro: Onde os novos usuários enviarão as informações de seus personagens.\n\n" +
    "- Canal de Aprovação: Onde os moderadores poderão aprovar ou reprovar as solicitações.\n\n" +
    "Utilize os botões abaixo para criar os canais ou voltar à configuração principal.",
  footer: {
    text: "home/createChannels",
  },
  buttons,
};

async function buttons(
  interaction: CommandInteraction | ButtonInteraction
): Promise<ActionRowBuilder<ButtonBuilder>> {
  const channelsCreated = await getChannelsCreated(interaction.guild!.id);
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    buttonConstructor({
      customId: "createchannels_createregister",
      label: "Criar Canal de Registro",
      emoji: "📝",
      disabled: channelsCreated.isEntryChannelCreated,
    }),
    buttonConstructor({
      customId: "createchannels_createapproval",
      label: "Criar Canal de Aprovação",
      emoji: "✅",
      disabled: channelsCreated.isApprovalChannelCreated,
    }),
    general.back,
    general.close
  );
}