import { useQuery } from "@apollo/client/react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GET_REPOSITORIES } from "../../graphql/queries";
import { Repository, RepositoryEdge } from "../../types/respository";
import RepositoryItem from "../RepositoryItem";
import Text from "../Text";

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface GetRepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
  };
}

const RepositoryList = () => {
  const { data, loading, error } = useQuery<GetRepositoriesData>(
    GET_REPOSITORIES,
    {
      onCompleted: (d) => {
        console.log("GET_REPOSITORIES data:", JSON.stringify(d, null, 2));
      },
      onError: (e) => {
        console.log("GET_REPOSITORIES error:", JSON.stringify(e, null, 2));
        console.log("graphQLErrors:", e.graphQLErrors);
        console.log("networkError:", e.networkError);
      },
    }
  );

  if (loading)
    return (
      <View>
        <FlatList
          data={[]}
          renderItem={null}
          ListEmptyComponent={
            <View>
              <Text>Loading...</Text>
            </View>
          }
        />
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
            {error.graphQLErrors.map((e) => e.message).join(" | ")}
          </Text>
        ) : null}
      </View>
    );
  }

  const repositoryNodes: Repository[] =
    data?.repositories?.edges?.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default RepositoryList;
