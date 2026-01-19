import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { GET_REPOSITORIES } from "../../graphql/queries";
import { RepositoryEdge } from "../../types/respository";
import Text from "../Text";
import RepositoryListContainer from "./RepositoryListContainer";

interface GetRepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
  };
}

const RepositoryList = () => {
  const { data, loading, error, refetch }: any =
    useQuery<GetRepositoriesData>(GET_REPOSITORIES);
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      // Puedes castear error como ApolloError si necesitas acceder a networkError/graphQLErrors
      console.log("GET_REPOSITORIES error:", JSON.stringify(error, null, 2));
    }
  }, [error]);

  // Refetch solo si el parámetro refetch está presente
  useEffect(() => {
    if (params?.refetch === "1") {
      refetch?.();
      router.replace("/");
    }
  }, [params?.refetch, refetch, router]);

  const repositories = data?.repositories ?? { edges: [] };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Error loading repositories</Text>
        <Text>{error.message}</Text>
        {error.networkError ? (
          <Text>NetworkError: {String(error.networkError)}</Text>
        ) : null}
        {error.graphQLErrors?.length ? (
          <Text>
            GraphQLErrors:{" "}
            {error.graphQLErrors.map((e: any) => e.message).join(" | ")}
          </Text>
        ) : null}
      </View>
    );
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
