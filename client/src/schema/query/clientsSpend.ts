import gql from "graphql-tag";

export const QUERY_CLIENT_TRANSACTIONS = gql`
    query clientTransactions($filters: QueryFilters) {
        clientTransactions (filters:$filters){
            _id
            itemsPurchased
            merchant
            clientId
            amount
            createdAt
        }
    }
`;
