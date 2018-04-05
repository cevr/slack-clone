export default `
type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    teams: [Team!]!
}

type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
}
`;
