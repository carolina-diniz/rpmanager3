import "dotenv/config";
import { lerJSON } from "./utils/jsonReader";

export default {
  TOKEN: {
    DISCORD: process.env.DISCORD_TOKEN,
  },
  DATABASE: {
    MONGOOSE: {
      USERNAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
    },
  },
  remoteConfig: {
    deployCommands: async (): Promise<boolean> => {
      const remoteConfig: any = await lerJSON("./src/remoteConfig.json");
      return remoteConfig.deployCommands;
    },
  },
};
