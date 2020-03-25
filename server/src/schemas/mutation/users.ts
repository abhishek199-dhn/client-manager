// language=GraphQL
const Users = `
    
    input AddUserInput {
        name: String!
        username: String!
        password: String!
    }

    extend type Mutation {
        addUser(user: AddUserInput!): User @auth
    }
`;


export default Users;