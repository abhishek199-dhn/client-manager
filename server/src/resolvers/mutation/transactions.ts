import {AppContext} from "index";
import Logger from "../../utils/logger/logger";
import {GraphQlRuntimeException} from "../../exceptions";
import {ClientTransaction} from "../../models/Transactions";

interface AddClientTransactionInput {
    transaction: ClientTransaction
}

interface UpdateClientTransactionInput {
    transaction: Partial<ClientTransaction> & {
        _id: string
    }
}

interface ClientTransactionMutationResponse extends ClientTransaction {
}

const TransactionsResolver = {
    Mutation: {
        addClientTransaction: async (
            parent: Object,
            args: AddClientTransactionInput,
            {services}: AppContext
        ): Promise<ClientTransactionMutationResponse> => {
            try {
                const data = await services.TransactionsService.addTransaction(args.transaction);
                return data.data;
            } catch (e) {
                Logger.error("Error in addClientTransaction: " + e);
                throw new GraphQlRuntimeException("Error in addClientTransaction", e);
            }
        },
        updateClientTransaction: async (
            parent: Object,
            args: UpdateClientTransactionInput,
            {services}: AppContext
        ): Promise<ClientTransactionMutationResponse> => {
            try {
                const updatedTransactions = await services.TransactionsService.updateTransaction(
                    args.transaction._id,
                    args.transaction
                );

                return updatedTransactions.data;
            } catch (e) {
                Logger.error("Error in updateClientTransaction: " + e);
                throw new GraphQlRuntimeException("Error in updateClientTransaction", e);
            }
        },
    },
};

export default TransactionsResolver;
