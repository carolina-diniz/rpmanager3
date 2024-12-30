import { connect, ConnectOptions } from "mongoose";
import { handleExit } from "..";
import print from "../core/print/print";
import storage from "../storage";

export default {
  connect: async () => {
    try {
      print.log(__filename, "Connecting to database...");

      const URI = `mongodb+srv://${storage.DATABASE.MONGOOSE.USERNAME}:${storage.DATABASE.MONGOOSE.PASSWORD}@rpmanager.lywzass.mongodb.net/?retryWrites=true&w=majority&appName=RPManager`;

      const clientOptions: ConnectOptions = {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
      };

      await connect(URI, clientOptions);

      print.log(__filename, "Connected to database!");
    } catch (error) {
      print.error(__filename, error);
      handleExit();
    }
  },
};
