import { ColorResolvable } from "discord.js";

export const approvementContent = {
  missing_permission: {
    title: "MISSING PERMISSIONS",
    description: "O bot não possui **PERMISSÃO** para adicionar o $$ ao usuário!",
    color: "Yellow" as ColorResolvable,
  },
  role_not_found: {
    title: "MISSING ROLE",
    description: "Não foi possível concluir a interação!\nO $$ não foi encontrado!",
    color: "Yellow" as ColorResolvable,
  },
  approved: {
    title: "ENTRADA APROVADA",
    description: null,
    color: "Green" as ColorResolvable,
    footer: { text: "Aprovado por: $$", iconURL: "" },
  },
  something_missing: {
    title: "MISSING INFORMATION",
    description: "Algo deu errado! Verifique se todas as informações estão corretas.",
    color: "Red" as ColorResolvable,
  },
  user_not_found: {
    title: "ENTRADA REJEITADA",
    description: "O usuário não foi encontrado na lista de membros do servidor.",
    color: "Red" as ColorResolvable,
  },
  missing_permission_nickname: {
    title: "MISSING PERMISSIONS",
    description: "O bot não possui **PERMISSÃO** para alterar o **APELIDO** do usuário <@$$>!",
    color: "Yellow" as ColorResolvable,
  },
  rejected: {
    title: "ENTRADA REJEITADA",
    description: null,
    color: "Red" as ColorResolvable,
    footer: { text: "Reprovado por: $$", iconURL: "" },
  }
};
