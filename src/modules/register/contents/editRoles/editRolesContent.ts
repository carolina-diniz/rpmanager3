import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import { buttonsList, createButton } from "../../../../core/buttons/buttonConstructor";

const { general } = buttonsList;

export default {
  title: "📂 Editar Cargos",
  description:
    "Aqui você pode editar os cargos do sistema de registro:\n\n" +
    "- Cargo de Entrada: Escolha um novo cargo para ser aplicado automaticamente aos novos usuários.\n\n" +
    "- Cargo de Aprovação: Escolha um novo cargo para ser utilizado na aprovação de solicitações. (Por enquanto, ficará desativado.)\n\n" +
    "Utilize os botões abaixo para editar os cargos ou voltar à configuração principal.",
  footer: {
    text: "home/editRoles",
  },
  buttons: async (interaction: CommandInteraction | ButtonInteraction): Promise<ActionRowBuilder<ButtonBuilder>> => {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      createButton({
        customId: "editRoles_editApproved",
        label: "Entrada",
        emoji: "📝",
      }),
      createButton({
        customId: "editRoles_editapproval",
        label: "Aprovação",
        emoji: "✅",
        disabled: true,
      }),
      general.back,
      general.close
    );
  },
};
