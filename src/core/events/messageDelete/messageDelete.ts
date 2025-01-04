import { Message, OmitPartialGroupDMChannel, PartialMessage } from "discord.js";
import print from "../../print/print";

export default async (message: OmitPartialGroupDMChannel<Message<boolean> | PartialMessage>) => {
  print.init(__filename);

  if (message.author?.bot) return;

  print.log(__filename, `message: ${message.content}`, message.guild, message.member?.user);
};
