import createApolloClient from '@/src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client/react';

const apolloClient = createApolloClient();

// Wraps children with ApolloProvider
export function ApolloProviderCustom({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
