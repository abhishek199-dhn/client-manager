import gql from "graphql-tag";

export const MUTATION_UPDATE_CLIENT_SPENDS = gql`
    mutation updateClientTransaction($transaction: UpadateClientTransactionInput!) {
        updateClientTransaction(transaction: $transaction) {
            _id
            amount
        }
    }
`;
