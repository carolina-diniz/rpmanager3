import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  GuildBasedChannel,
  GuildMember,
  ModalSubmitInteraction,
} from "discord.js";
import database from "../../../core/database/database";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";

export async function execute(interaction: ModalSubmitInteraction) {
  try {
    const data = {
      name: interaction.fields.getTextInputValue("register_input_name"),
      id: interaction.fields.getTextInputValue("register_input_id"),
      recruiter: interaction.fields.getTextInputValue("register_input_recruiter"),
    };

    const recruiter = await getRecruiter(interaction, data.recruiter);

    const embed = new EmbedBuilder()
      .setTitle("AGUARDANDO APROVAÇÃO")
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFields([
        { name: "Nome", value: data.name, inline: false },
        { name: "ID", value: data.id, inline: false },
        {
          name: "Recrutador",
          value: recruiter?.id ? `<@${recruiter.id}>` : data.recruiter,
          inline: false,
        },
      ])
      .setTimestamp(Date.now());

    const aprovar = new ButtonBuilder()
      .setCustomId("approvement_approve")
      .setLabel("Aprovar")
      .setEmoji({ name: "✅" })
      .setStyle(ButtonStyle.Success);

    const reprovar = new ButtonBuilder()
      .setCustomId("approvement_reject")
      .setLabel("Reprovar")
      .setEmoji({ name: "✖️" })
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(aprovar, reprovar);

    const channel = await getChannel(interaction.guild!);

    if (channel?.isSendable()) {
      await channel
        .send({ content: `||<@${interaction.user.id}>||`, embeds: [embed], components: [row] })
        .then(async () => {
          await sendReplyMessage(interaction);
        });
      return;
    }

    await interaction.deferReply();
    await interaction.deleteReply();
  } catch (error) {
    print.error(__filename, error);
  }
}

async function sendReplyMessage(interaction: ModalSubmitInteraction) {
  const timeout: number = 30000;

  const embed = new EmbedBuilder().setTitle("Sua solicitação foi enviada com sucesso!")
    .setDescription(`Por favor, aguarde um momento!\n
    Seu pedido será avaliado por um moderador e seu acesso será liberado em breve.\n\n
    Mensagem deletada <t:${Math.floor((Date.now() + timeout) / 1000)}:R>.`);

  interaction.reply({ embeds: [embed!], ephemeral: true }).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, timeout);
  });
}

async function getChannel(guild: Guild): Promise<GuildBasedChannel | null> {
  const guildDb = await database.get("guild", guild);
  let channelId: string | null = null;

  guildDb?.channels.forEach((channel) => {
    if (channel.isApprovalChannel) {
      channelId = channel.id;
    }
  });

  if (channelId) {
    return await guild.channels.fetch(channelId);
  }

  return null;
}

async function getRecruiter(
  interaction: ModalSubmitInteraction,
  recruiterId: string
): Promise<GuildMember | undefined> {
  const guildDb = await modelGuild.findOne({ id: interaction.guild!.id });
  if (!guildDb) return;

  const managers = Array.from(guildDb.members.values()).filter((value) => {
    if ((value.entryManager === false || value.entryManager === true) && value.gameId === recruiterId)
      return true;
  });

  if (managers.length === 0) return;

  const recruiter = await interaction.guild?.members.fetch(managers[0].id);

  if (!recruiter) return;

  return recruiter;
}
