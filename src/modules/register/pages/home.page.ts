import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import buttonConstructor from "../../../core/buttons/buttonConstructor";
import buttonsList from "../../../core/buttons/buttonsList";
import getChannelsCreated from "../services/getChannelsCreated";
import getRolesCreated from "../services/getRolesCreated";

const { general } = buttonsList;

export default {
  title: "🛠️ Configurações de Register",
  description:
    "O sistema de Register gerencia como os novos usuários serão recebidos no servidor. Ele controla os canais e cargos necessários para que os jogadores possam enviar suas informações de personagem, e para que moderadores possam aprová-las ou reprová-las.\n\n" +
    'Utilize os botões abaixo para configurar o sistema de registro. Caso deseje sair, use o botão "Fechar".',
  footer: {
    text: "home",
  },
  buttons,
};

async function buttons(
  interaction: CommandInteraction | ButtonInteraction
): Promise<ActionRowBuilder<ButtonBuilder>> {
  const channelsCreated = await getChannelsCreated(interaction.guild!);
  const rolesCreated = await getRolesCreated(interaction.guild!);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    buttonConstructor({
      customId: "register_createchannels",
      label: "Criar Canais",
      emoji: "➕",
      disabled:
        channelsCreated.isApprovalChannelCreated && channelsCreated.isEntryChannelCreated ? true : false,
    }),
    buttonConstructor({
      customId: "register_editchannels",
      label: "Editar Canais",
      emoji: "✍️",
      disabled:
        channelsCreated.isApprovalChannelCreated || channelsCreated.isEntryChannelCreated ? false : true,
    }),
    buttonConstructor({
      customId: "register_createroles",
      label: "Criar Cargos",
      emoji: "🛂",
      disabled: rolesCreated.EntryManager && rolesCreated.ApprovedMember ? true : false,
    }),
    buttonConstructor({
      customId: "register_editroles",
      label: "Editar Cargos",
      emoji: "🛂",
      disabled: rolesCreated.EntryManager || rolesCreated.ApprovedMember ? false : true,
    }),
    general.close
  );
}
