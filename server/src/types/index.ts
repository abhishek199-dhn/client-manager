import {Types} from "mongoose";
import {Context} from "apollo-server-core";
import UsersService from "../services/Users";
import ClientsService from "../services/Clients";
import TransactionsService from "../services/Transactions";
import Authenticator from "../utils/Authenticator";

export interface AppConfig {
    port: number;
    dbConnectors: DbConnectorsConfig
}

export interface DbConnectorsConfig {
    mongoDB: MongoDatabaseConfig
}

export interface MongoDatabaseConfig {
    connectionURL: string
}

export interface QueryFilters {
    limit?: number;
    skip?: number;
    _id?: string;
}

export interface BaseMongoDbFilters {
    limit?: number;
    skip?: number;
    _id?: Types.ObjectId;
}

interface CustomContext {
    request: Express.Request,
    services: {
        UsersService: UsersService;
        TransactionsService: TransactionsService;
        ClientsService: ClientsService;
    },
    aclContext: {
        authenticator: Authenticator
    }
}

export type AppContext = Context<CustomContext>;