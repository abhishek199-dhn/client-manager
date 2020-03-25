// language=GraphQL
const Transactions = `

    input AddClientTransactionInput {
        itemsPurchased: String!
        merchant: String!
        clientId: ID!
        amount: Float!
    }

    input UpadateClientTransactionInput {
        _id: String!
        itemsPurchased: String
        merchant: String
        clientId: ID
        amount: Float
    }

    extend type Mutation {
        addClientTransaction(transaction: AddClientTransactionInput!): ClientTransaction @auth
        updateClientTransaction(transaction: UpadateClientTransactionInput!): ClientTransaction @auth
    }
`;

export default Transactions;