import UsersQuery from "./query/users";
import ClientsQuery from "./query/clients";
import AuthMutation from "./mutation/auth";
import UsersMutation from "./mutation/users";
import ClientsMutation from "./mutation/clients";
import TransactionsQuery from "./query/transactions";
import TransactionsMutation from "./mutation/transactions";

// language=GraphQL
const RootQuery = `

    directive @date(
        defaultFormat: String = "MM-DD-YYYY"
    ) on FIELD_DEFINITION
    
    directive @auth on OBJECT | FIELD_DEFINITION | FIELD

    type Query {
        _blank : String
    }

    type Mutation {
        _blank : String
    }

    input QueryFilters {
        limit: Int
        skip: Int
        _id: ID
    }
`;

const typeDefs = [
    RootQuery,
    UsersQuery,
    ClientsQuery,
    AuthMutation,
    UsersMutation,
    ClientsMutation,
    TransactionsQuery,
    TransactionsMutation
];

export default typeDefs;
