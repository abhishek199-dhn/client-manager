// language=GraphQL
const Transactions = `
    type ClientTransaction {
        _id: ID!
        itemsPurchased: String!
        merchant: String!
        clientId: ID!
        amount: Float!
        createdAt: String! @date
        updatedAt: String! @date
    }

    extend type Query {
        clientTransactions(clientId: ID, filters: QueryFilters): [ClientTransaction] @auth
    }
`;


export default Transactions;