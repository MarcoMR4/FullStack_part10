// src/hooks/useSignIn.ts
import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations";

// Types for the mutation variables and result
export interface AuthenticatePayload {
  accessToken: string;
  __typename?: string;
}

export interface SignInResult {
  authenticate: AuthenticatePayload;
}

export interface SignInVariables {
  username: string;
  password: string;
}

export const useSignIn = () => {
  const [mutate, { data, loading, error }] = useMutation<SignInResult, { credentials: SignInVariables }>(SIGN_IN);

  const signIn = async (variables: SignInVariables) => {
    const response = await mutate({
      variables: {
        credentials: variables,
      },
    });
    return response;
  };

  return { signIn, loading, error, response: data };
};