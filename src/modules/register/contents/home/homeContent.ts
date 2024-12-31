import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import { buttonsList, createButton } from "../../../../core/buttons/buttonConstructor";
import getChannelsCreated from "../../services/getChannelsCreated";
import getRolesCreated from "../../services/getRolesCreated";
const { general } = buttonsList;

export default {
  title: "🛠️ Configurações de Register",
  description:
    "O sistema de Register gerencia como os novos usuários serão recebidos no servidor. Ele controla os canais e cargos necessários para que os jogadores possam enviar suas informações de personagem, e para que moderadores possam aprová-las ou reprová-las.\n\n" +
    'Utilize os botões abaixo para configurar o sistema de registro. Caso deseje sair, use o botão "Fechar".',
  footer: {
    text: "home",
  },
  buttons: async (
    interaction: CommandInteraction | ButtonInteraction
  ): Promise<ActionRowBuilder<ButtonBuilder>> => {
    const channelsCreated = await getChannelsCreated(interaction.guildId!);
    const rolesCreated = await getRolesCreated(interaction.guildId!);

    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      createButton({
        customId: "register_createchannels",
        label: "Criar Canais",
        emoji: "➕",
        disabled:
          channelsCreated.isApprovalChannelCreated && channelsCreated.isEntryChannelCreated ? true : false,
      }),
      createButton({
        customId: "register_editChannels",
        label: "Editar Canais",
        emoji: "✍️",
        disabled:
          channelsCreated.isApprovalChannelCreated || channelsCreated.isEntryChannelCreated ? false : true,
      }),
      createButton({
        customId: "register_createRoles",
        label: "Criar Cargos",
        emoji: "🛂",
        disabled: rolesCreated.EntryManager && rolesCreated.ApprovedMember ? true : false,
      }),
      createButton({
        customId: "register_editRoles",
        label: "Editar Cargos",
        emoji: "🛂",
        disabled: rolesCreated.EntryManager || rolesCreated.ApprovedMember ? false : true,
      }),
      general.close
    );
  },
};
