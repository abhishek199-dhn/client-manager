// language=GraphQL
const Auth = `

    input AuthInput {
        username: String!
        password: String!
    }

    type Auth {
        token: String!
    }

    extend type Mutation {
        login(auth: AuthInput!): Auth
    }
`;


export default Auth;