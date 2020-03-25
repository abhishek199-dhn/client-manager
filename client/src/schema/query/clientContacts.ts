import gql from "graphql-tag";

export const QUERY_CLIENT_CONTACTS = gql`
    query clientContacts($filters: QueryFilters) {
        clients (filters:$filters) {
            address
            companyName
            createdAt
            industry
            name
            title
        }
    }
`;
