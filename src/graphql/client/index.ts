import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://gql-task-flow.vercel.app/api/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
