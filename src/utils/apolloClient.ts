import {
    ApolloClient,
    HttpLink,
    InMemoryCache
} from '@apollo/client';
import baseApi from '../constants/baseApi';

export const createApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${baseApi}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default createApolloClient;