import { Document, Types } from "mongoose";
import { ModelGuild } from "./models";
import modelGuild from "./models/guilds/modelGuild";

type guildDocument =
  | (Document<unknown, {}, ModelGuild> & ModelGuild & { _id: Types.ObjectId } & { __v: number })
  | null;

export default {
  get: async (documentName: "guild", guild: { id: string }): Promise<guildDocument> => {
    return new Promise(async (resolve, reject) => {
      if (documentName === "guild") {
        const guildDb = await modelGuild.findOne({ id: guild.id });

        if (guildDb) {
          resolve(guildDb);
        }
      }
      reject(null);
    });
  },
};
