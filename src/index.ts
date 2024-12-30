import databaseApi from "./connections/database.api";
import discordApi from "./connections/discord.api";
import events from "./core/events/events";
import print from "./core/print/print";

async function initialize() {
  console.clear()
  console.log("A DEUSA ESTÁ ACORDANDO  " + "🌙");
  await databaseApi.connect();
  await discordApi.connect();
  events.listen();
}

initialize();

export function handleExit() {
  print.warn(__filename, "Caught interrupt signal");
  process.exit(1);
}

process.on("SIGINT", handleExit);

process.on("uncaughtException", (error) => {
  print.warn(__filename, "uncaughtException: ", error);
});

process.on("unhandledRejection", (reason, promise) => {
  print.warn(__filename, "unhandledRejection", { unhandledRejection: { reason, promise } });
});
