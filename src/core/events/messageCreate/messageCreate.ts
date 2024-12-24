import { Message, OmitPartialGroupDMChannel } from "discord.js";

export default async (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
  console.log(`[EVENT] (messageCreate) <user: ${message.author.username}>`);

  if (message.author.bot) return;
};
