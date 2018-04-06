export default ` 

type User {
    id: Int!
    email: String!
    username: String!
    messages: Message!
    teams: [Team!]!
}
type Query {
    getUser(id: Int!): User!
    allUsers: [User!]
}

type RegisterResponse {
    successful: Boolean,
    user: User,
    errors: [Error!]
}

type LoginResponse {
    successful: Boolean!,
    token: String,
    refreshToken: String,
    errors: [Error!],
    user: User!
}
type Mutation{
    register(username: String, email: String, password: String): RegisterResponse!
    login(email: String, password: String): LoginResponse!
}
`;
