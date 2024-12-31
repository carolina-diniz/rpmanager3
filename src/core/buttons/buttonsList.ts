import { ButtonStyle } from "discord.js";
import buttonConstructor from "./buttonConstructor";

export default {
  general: {
    close: buttonConstructor({
      customId: "general_close",
      label: "Fechar",
      emoji: "❌",
      buttonStyle: ButtonStyle.Danger,
    }),
    back: buttonConstructor({
      customId: "general_back",
      label: "Voltar",
      emoji: "⬅️",
      buttonStyle: ButtonStyle.Secondary,
    }),
  },
};