import React, {FC, useCallback} from "react";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {ClientSpends} from "../../../types";
import {QUERY_CLIENT_TRANSACTIONS} from "../../../schema/query";
import {MUTATION_UPDATE_CLIENT_SPENDS} from "../../../schema/mutation";
import ClientsSpendHistoryView from "../../../components/Dashboard/ClientsSpendHistory/ClientsSpendHistory";

export interface ClientsTransactionsResponse {
    clientTransactions: ClientSpends[]
}

export interface UpdateClientsTransactionsVariable {
    transaction: {
        _id: string;
        amount: number;
    }
}

export interface UpdateClientsTransactionsResponse {
    updateClientTransaction: {
        _id: string;
        amount: number;
    }
}

const ClientsSpendHistory: FC = () => {
    const {loading, data} = useQuery<ClientsTransactionsResponse>(QUERY_CLIENT_TRANSACTIONS);
    const [
        updateClientSpend,
        {
            loading: mutationLoader
        }
    ] = useMutation<UpdateClientsTransactionsResponse, UpdateClientsTransactionsVariable>(MUTATION_UPDATE_CLIENT_SPENDS);

    const clientTransactions = data && data.clientTransactions ? data.clientTransactions : [];


    const memoOnSpendsUpdated = useCallback(
        async (updatedIndex: number, clientSpends: ClientSpends) => {
            await updateClientSpend({
                variables: {
                    transaction: {
                        _id: clientSpends._id,
                        amount: Number(clientSpends.amount || 0)
                    }
                }
            }).catch((e) => {
                console.log("updateClientSpend error", e)
            })
        }, [updateClientSpend]
    );

    return (
        <ClientsSpendHistoryView
            showLoader={mutationLoader || loading}
            clientSpends={clientTransactions}
            onSpendsUpdated={memoOnSpendsUpdated}
        />
    )
}

export default ClientsSpendHistory;