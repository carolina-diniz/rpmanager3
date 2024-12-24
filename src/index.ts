import databaseApi from "./connections/database.api";
import discordApi from "./connections/discord.api";
import events from "./core/events/events";

async function initialize() {
  await databaseApi.connect();
  await discordApi.connect();
  events.listen();
}

initialize();

export function handleExit() {
  console.log("Caught interrupt signal");
  process.exit(1);
}

process.on("SIGINT", handleExit);

process.on("uncaughtException", (error) => {
  console.warn("uncaughtException: ", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.warn({ unhandledRejection: { reason, promise } });
});
