import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  Guild,
  TextChannel,
} from "discord.js";
import { eventEmitter, onBuffered } from "../../../core";
import modelGuild from "../../../core/database/models/guild/modelGuild";
import print from "../../../core/print/print";
import { genericPage } from "../../genericPage";

export async function execute(interaction: ButtonInteraction) {
  print.log(__filename, "starting execution");

  const { guild, channel: interactionChannel } = interaction;
  const channelName = "Registro de Personagem";

  if (!guild) {
    print.error(__filename, "Guild not found in interaction");
    return interaction.reply({ content: "Erro: Servidor não encontrado.", ephemeral: true });
  }

  try {
    const channel = await createChannel(guild, channelName);
    if (!channel) throw new Error("Channel not created");

    await createRegisterMessage(channel, guild.name);
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
        allow: ["ViewChannel", "ReadMessageHistory"],
        deny: [
          "SendMessages",
          "SendMessagesInThreads",
          "SendPolls",
          "SendTTSMessages",
          "SendVoiceMessages",
          "ManageMessages",
          "AddReactions",
        ],
      },
    ],
    type: ChannelType.GuildText,
  });

  if (channel) {
    try {
      await waitForChannelSave(channel.id);
      await saveIsEntryChannel(channel);
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

async function saveIsEntryChannel(channel: TextChannel): Promise<void> {
  const guildDb = await modelGuild.findOne({ id: channel.guild.id });

  if (!guildDb) throw new Error("Guild not found");

  const channelData = guildDb.channels.get(channel.id);

  if (!channelData) throw new Error("Channel not found");
  channelData.isEntryChannel = true;

  guildDb.channels.set(channel.id, channelData);
  guildDb.markModified("channels");

  await guildDb.save();
}

async function createRegisterMessage(channel: TextChannel, guildName: string): Promise<void> {
  const embedMessage = new EmbedBuilder()
    .setTitle(`REGISTRO ~ ${guildName.toUpperCase()}`)
    .setDescription(
      `Bem-vindo ao sistema de registro do ${guildName}!\n` +
        `Preencha com suas informações do jogo e evite compartilhar dados pessoais.\n\n` +
        `Clique no botão \` Iniciar \` para prosseguir com o registro.`
    );

  const start = new ButtonBuilder()
    .setCustomId("createregister_start")
    .setLabel("Iniciar")
    .setStyle(ButtonStyle.Success)
    .setEmoji({ name: "✅" });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(start);

  await channel.send({ embeds: [embedMessage], components: [row] });
}
