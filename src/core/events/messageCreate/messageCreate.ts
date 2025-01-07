import { Message, OmitPartialGroupDMChannel } from "discord.js";
import print from "../../print/print";

export default async (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
  try {
    print.init(__filename);

    if (message.author.bot) return;

    print.log(
      __filename,
      `content: \n${message.content}`,
      message.guild,
      message.member?.user,
      message.channel
    );

    if (message.content.includes("steamcommunity.com/gift-card")) {
      message.delete();
      message.channel.send("Mensagem deletada por conter link suspeito.");
    }
  } catch (error) {
    print.error(__filename, null, error, message.guild, message.member?.user, message.channel);
  }
};
