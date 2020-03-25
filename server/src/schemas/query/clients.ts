// language=GraphQL
const Clients = `
    type Client {
        _id: ID!
        name: String!
        title: String!
        companyName: String!
        address: String!
        industry: String
        createdAt: String! @date
        updatedAt: String! @date
    }

    extend type Query {
        clients(filters: QueryFilters): [Client] @auth
    }
`;


export default Clients;