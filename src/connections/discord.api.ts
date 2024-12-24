import { Client, IntentsBitField } from "discord.js";
import storage from "../storage";

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

export default {
  connect: async () => {
    return await client.login(storage.TOKEN.DISCORD);
  },
};
