import mongoose from "mongoose";
import Logger from "../utils/logger";

export interface MongoDbConnectorOptions {
    url: string;
}

class MongoDbConnector {
    options: MongoDbConnectorOptions;

    constructor(options: MongoDbConnectorOptions) {
        this.options = options;
    }

    connect = async () => {
        try {
            Logger.info("Establish new connection with url", this.options.url);
            mongoose.Promise = global.Promise;
            mongoose.set("useNewUrlParser", true);
            mongoose.set("useFindAndModify", false);
            mongoose.set("useCreateIndex", true);
            mongoose.set("useUnifiedTopology", true);
            await mongoose.connect(this.options.url);
        } catch (error) {
            Logger.error("MongoDb connection failed :: " + error);
            process.exit(1);
            throw new Error("MongoDb connection failed")
        }
    }
}

export default MongoDbConnector;
