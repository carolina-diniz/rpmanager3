import { Message, OmitPartialGroupDMChannel } from "discord.js";
import print from "../../print/print";

export default async (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
  print.init(__filename)

  if (message.author.bot) return;
};
