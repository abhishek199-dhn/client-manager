import {Types} from "mongoose";
import {QueryFilters} from "index";
import {ClientTransaction, ClientTransactionDoc} from "../models/Transactions";
import BaseService, {BaseServiceOptions} from "./BaseService";

export interface TransactionsServiceOptions extends BaseServiceOptions<ClientTransactionDoc> {
}

class TransactionsService extends BaseService<ClientTransactionDoc> {
    constructor(options: TransactionsServiceOptions) {
        super(options);
    }

    getTransactions = async (clientId: string | null, filters: QueryFilters) => {
        return this.getAll(filters, clientId ? {clientId} : {});
    };

    addTransaction = (data: ClientTransaction) => {
        return this.insert(<ClientTransactionDoc>data)
    };

    updateTransaction = (transactionId: Types.ObjectId | string, transaction: Partial<ClientTransaction>) => {
        return this.update(transactionId, transaction);
    }
}

export default TransactionsService;