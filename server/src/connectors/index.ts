import config from "config";
import {MongoDatabaseConfig} from "index";
import Constants from "../utils/Constants";
import MongoDbConnector from "./MongoDbConnector";

const DB_CLIENT_HISTORY = Constants.DB.MONGO.CLIENT_HISTORY.DB_NAME;

export function getClientHistoryDbConnector() {
    const dbConfig: MongoDatabaseConfig = config.get("dbConnectors.mongoDB");
    const url = process.env.MONGO_DB_URL || `${dbConfig.connectionURL}/${DB_CLIENT_HISTORY}`;

    return new MongoDbConnector({
        url
    });
}