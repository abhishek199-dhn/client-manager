import gql from "graphql-tag";

export const MUTATION_LOGIN = gql`
    mutation login($auth: AuthInput!) {
        login(auth: $auth) {
            token
        }
    }
`;
