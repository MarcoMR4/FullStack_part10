import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import baseApi from '../constants/baseApi';
import AuthStorage from './authStorage';

const createApolloClient = (authStorage: AuthStorage) => {
  const httpLink = new HttpLink({
    uri: `${baseApi}/graphql`,
  });

  const authLink = new SetContextLink(async (_, { headers }: any) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.error('Error setting access token', e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;