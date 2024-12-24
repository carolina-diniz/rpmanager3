import { connect, ConnectOptions } from "mongoose";
import { handleExit } from "..";
import storage from "../storage";

export default {
  connect: async () => {
    try {
      console.log("Connecting to database...");

      const URI = `mongodb+srv://${storage.DATABASE.MONGOOSE.USERNAME}:${storage.DATABASE.MONGOOSE.PASSWORD}@rpmanager.lywzass.mongodb.net/?retryWrites=true&w=majority&appName=RPManager`;

      const clientOptions: ConnectOptions = {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
      };

      await connect(URI, clientOptions);

      console.log("Connected to database!");
    } catch (error) {
      console.error("Error connecting to database: ", error);
      handleExit();
    }
  },
};
