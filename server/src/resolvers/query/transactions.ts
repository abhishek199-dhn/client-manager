import {AppContext, QueryFilters} from "index";
import Logger from "../../utils/logger/logger";
import {GraphQlRuntimeException} from "../../exceptions";
import {ClientTransaction} from "../../models/Transactions";

interface ClientTransactionArgs {
    clientId?: string | null;
    filters?: QueryFilters | null;
}

interface ClientTransactionResponse extends ClientTransaction {
}

const ClientTransactionsResolver = {
    Query: {
        clientTransactions: async (
            parent: Object,
            args: ClientTransactionArgs,
            {services}: AppContext
        ): Promise<Array<ClientTransactionResponse>> => {
            try {
                const data = await services.TransactionsService.getTransactions(args.clientId, args.filters || {});
                return data.data;
            } catch (e) {
                Logger.error("Error in ClientTransactionsResolver:: unable to get client transactions: " + e);
                throw new GraphQlRuntimeException("Error in ClientTransactionsResolver", e);
            }
        },
    },
};

export default ClientTransactionsResolver;
