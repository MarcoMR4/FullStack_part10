import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, { data, loading, error }] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }: { username: string; password: string }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    return response;
  };

  return { signIn, loading, error, response: data };
};