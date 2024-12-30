import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CommandInteraction } from "discord.js";
import { buttonsList, createButton } from "../../../../core/buttons/buttonConstructor";

const { general } = buttonsList;

export default {
  title: "📂 Criar Cargos",
  description:
    "Aqui você pode criar os cargos necessários para o sistema de registro:\n\n" +
    "- Cargo de Entrada: Aplicado automaticamente aos novos usuários.\n\n" +
    "- Cargo de Aprovação: Utilizado para moderadores aprovarem as solicitações. (Por enquanto, ficará desativado.)\n\n" +
    "Utilize os botões abaixo para criar os cargos ou voltar à configuração principal.",
  footer: {
    text: "home/createRoles",
  },
  buttons: async (interaction: CommandInteraction | ButtonInteraction): Promise<ActionRowBuilder<ButtonBuilder>> => {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      createButton({
        customId: "createroles_createapproved",
        label: "Criar Cargo de Entrada",
        emoji: "📝",
      }),
      createButton({
        customId: "createroles_createapproval",
        label: "Criar Cargo de Aprovação",
        emoji: "✅",
        disabled: true,
      }),
      general.back,
      general.close
    );
  },
};
