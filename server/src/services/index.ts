import UsersService from "./Users";
import ClientsService from "./Clients";
import UsersModel from "../models/Users";
import ClientsModel from "../models/Clients";
import TransactionsService from "./Transactions";
import TransactionsModel from "../models/Transactions";
import {getClientHistoryDbConnector} from "../connectors";

(async () => {
    // connecting to mongoDB
    await getClientHistoryDbConnector().connect();
})();

const usersModel = new UsersModel();
const transactionsModel = new TransactionsModel();
const clientsModel = new ClientsModel();

usersModel.initSchema();
transactionsModel.initSchema();
clientsModel.initSchema();

const usersModelInstance = usersModel.getInstance();
const transactionModelInstance = transactionsModel.getInstance();
const clientsModelInstance = clientsModel.getInstance();

export default () => {
    return {
        UsersService: new UsersService({model: usersModelInstance}),
        TransactionsService: new TransactionsService({model: transactionModelInstance}),
        ClientsService: new ClientsService({model: clientsModelInstance}),
    }
};