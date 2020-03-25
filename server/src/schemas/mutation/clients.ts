// language=GraphQL
const Clients = `

    input AddClientInput {
        name: String!
        title: String!
        companyName: String!
        address: String!
        industry: String
    }

    extend type Mutation {
        addClient(client: AddClientInput!): Client @auth
    }
`;

export default Clients;