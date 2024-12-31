import { ButtonBuilder, ButtonStyle, ComponentEmojiResolvable } from "discord.js";
import print from "../print/print";

export type buttonsConstructorType = {
  customId: string;
  label: string;
  emoji?: ComponentEmojiResolvable;
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
};



export default (data: buttonsConstructorType): ButtonBuilder => {
  const { customId, label, emoji, buttonStyle = ButtonStyle.Primary, disabled = false } = data;
  print.log(__filename, `Building ${customId}`);

  const button = new ButtonBuilder()
    .setCustomId(customId.toLowerCase())
    .setLabel(label)
    .setStyle(buttonStyle)
    .setDisabled(disabled);

  if (emoji) {
    button.setEmoji(emoji);
  }

  return button;
};
