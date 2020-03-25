// language=GraphQL
const Users = `
    type User {
        _id: ID!
        name: String!
        username: String!
        createdAt: String! @date
        updatedAt: String! @date
    }

    extend type Query {
        users(filters: QueryFilters) : [User] @auth
    }
`;

export default Users;