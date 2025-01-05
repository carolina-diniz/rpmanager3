import { Message, OmitPartialGroupDMChannel } from "discord.js";
import print from "../../print/print";

export default async (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
  print.init(__filename);

  if (message.author.bot) return;

  print.log(__filename, `content: ${message.content}`, message.guild, message.member?.user, message.channel);
};
