import {
  ColorResolvable,
  DMChannel,
  EmbedBuilder,
  Guild,
  NewsChannel,
  NonThreadGuildBasedChannel,
  PartialDMChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  User,
  VoiceChannel,
} from "discord.js";
import { client } from "../../connections";

async function sendToDiscordLog(
  fileName: string,
  path: string,
  message: string,
  level: "LOG" | "ERROR",
  guild?: Guild | null,
  user?: User,
  channel?:
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | StageChannel
  | TextChannel
  | PublicThreadChannel<boolean>
  | PrivateThreadChannel
  | VoiceChannel
  | NonThreadGuildBasedChannel
  | TextBasedChannel
  | null
): Promise<void> {
  if (!guild) return;

  let channelId = "";

  switch (fileName) {
    case "messageCreate":
      channelId = "1325520347251998760";
      break;
    default:
      channelId = "1275590381337051136";
      break;
  }

  const RPGuild = await client.guilds.resolve("1263326476502044784");
  const RPChannel = await RPGuild?.channels.resolve(level === "ERROR" ? "1325181163094020166" : channelId);

  if (!RPChannel || !RPChannel.isTextBased()) return console.error("RPChannel not found");

  let color: ColorResolvable = "#0dffef";

  if (fileName.toLowerCase().includes("create")) {
    color = "Green";
  }
  if (fileName.toLowerCase().includes("delete")) {
    color = "Red";
  }

  const channelResolved = guild.channels.resolve(channel?.id ?? "");

  const embed = new EmbedBuilder()
    .setTitle(`EVENT: ${fileName} `)
    .setDescription(
      `**Guild:** ${guild.name}\n` +
        "**Level:** LOG\n" +
        `**Path:** ${path.split("rpmanager3")[1]}\n` +
        (user ? `**User:** <@${user.id}>\n` : "") +
        `**Channel:** ${channelResolved?.name}\n` +
        `**Message:** ${message}\n`
    )
    .setFooter({
      text: guild.name,
      iconURL: guild.iconURL() ?? undefined,
    })
    .setColor(color)
    .setTimestamp(Date.now());

  RPChannel.send({ embeds: [embed] });
}

export default {
  init: (path: string) => {
    const fileName = getFileName(path);
    console.log(`[${fileName}] starting executing <.${path.split("rpmanager3")[1]}>`);
  },
  log: (
    path: string,
    message: string,
    guild?: Guild | null,
    user?: User,
    channel?:
      | DMChannel
      | PartialDMChannel
      | NewsChannel
      | StageChannel
      | TextChannel
      | PublicThreadChannel<boolean>
      | PrivateThreadChannel
      | VoiceChannel
      | NonThreadGuildBasedChannel
      | TextBasedChannel
      | null
  ) => {
    let fileName = getFileName(path);
    let editedMessage = "";

    switch (fileName) {
      case "events":
        fileName = `\x1b[35m${fileName.toUpperCase()}\x1b[0m`;
        editedMessage = `(\x1b[34m${message}\x1b[0m)`;
        break;
    }

    console.log(`[${fileName}] ${editedMessage !== "" ? editedMessage : message}`);
    sendToDiscordLog(fileName, path, message, "LOG", guild, user, channel);
  },
  error: (
    path: string,
    message: string | unknown,
    error?: unknown,
    guild?: Guild | null,
    user?: User,
    channel?:
      | DMChannel
      | PartialDMChannel
      | NewsChannel
      | StageChannel
      | TextChannel
      | PublicThreadChannel<boolean>
      | PrivateThreadChannel
      | VoiceChannel
      | NonThreadGuildBasedChannel
      | TextBasedChannel
      | null
  ) => {
    const fileName = getFileName(path);
    console.log("***********");
    if (message && error) {
      console.error(`[${fileName}] ${message ?? ""}`, error ?? "");
    } else {
      console.error(`[${fileName}]`, message);
    }
    console.log("***********");

    sendToDiscordLog(fileName, path, `${message}\n**Error**: ${error}`, "ERROR", guild, user, channel);
  },
  warn: (path: string, message: string, error?: unknown) => {
    const fileName = getFileName(path);
    console.log(`[${fileName}] ${message}`);
    if (error) {
      console.warn(error);
    }
  },
};

export function getFileName(path: string) {
  let fileName: string[] | string = path.replace(/[\\/]/g, "/").split("/");
  fileName = fileName[fileName.length - 1].split(".")[0];

  return fileName;
}
