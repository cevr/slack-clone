import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

const client = new ApolloClient({
    cache,
    link
});
export default client;
