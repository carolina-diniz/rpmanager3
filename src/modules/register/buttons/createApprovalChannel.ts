import { ButtonInteraction, ChannelType, Guild, TextChannel } from "discord.js";
import { eventEmitter, onBuffered } from "../../../core";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";
import { genericPage } from "../../genericPage";

export async function execute(interaction: ButtonInteraction) {
  print.log(__filename, "starting execution");

  const { guild, channel: interactionChannel } = interaction;
  const channelName = "Aprovação de Personagem";

  if (!guild) {
    print.error(__filename, "Guild not found in interaction");
    return interaction.reply({ content: "Erro: Servidor não encontrado.", ephemeral: true });
  }

  try {
    const channel = await createChannel(guild, channelName);
    if (!channel) throw new Error("Channel not created");

    interaction.customId = "register_createchannels";
    await genericPage.execute(interaction);

    if (interactionChannel?.isSendable()) {
      await interactionChannel.send(`Canal de ${channelName} criado com sucesso!`);
    }
  } catch (error) {
    print.error(__filename, error);

    await interaction.reply({
      content: `Houve um erro ao criar o canal de ${channelName}.`,
      ephemeral: true,
    });
  }
}

async function createChannel(guild: Guild, channelName: string) {
  const channel = await guild.channels.create({
    name: channelName,
    permissionOverwrites: [
      {
        id: guild.roles.everyone.id,
        allow: ["ReadMessageHistory", "ManageMessages"],
        deny: [
          "ViewChannel",
          "SendMessages",
          "SendMessagesInThreads",
          "SendPolls",
          "SendTTSMessages",
          "SendVoiceMessages",
        ],
      },
    ],
    type: ChannelType.GuildText,
  });

  if (channel) {
    try {
      await waitForChannelSave(channel.id);
      await saveIsApprovalChannel(channel);
      return channel;
    } catch (error) {
      console.error("[createRegister] Error saving channel:", error);
      return null;
    }
  }
}

async function waitForChannelSave(channelId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout ao salvar canal no banco de dados."));
    }, 10000);

    const listener = (savedChannelId: string) => {
      if (savedChannelId === channelId) {
        clearTimeout(timeout);
        eventEmitter.off("channelSaved", listener);
        resolve();
      }
    };

    onBuffered("channelSaved", listener);
  });
}

async function saveIsApprovalChannel(channel: TextChannel): Promise<void> {
  const guildDb = await modelGuild.findOne({ id: channel.guild.id });

  if (!guildDb) throw new Error("Guild not found");

  const channelData = guildDb.channels.get(channel.id);

  if (!channelData) throw new Error("Channel not found");
  channelData.isApprovalChannel = true;

  guildDb.channels.set(channel.id, channelData);
  guildDb.markModified("channels");

  await guildDb.save();
}
