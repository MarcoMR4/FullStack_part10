import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Repository, RepositoryEdge } from "../../types/respository";
import RepositoryItem from "../RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface RepositoryListContainerProps {
  repositories: {
    edges: RepositoryEdge[];
  };
}

const RepositoryListContainer: React.FC<RepositoryListContainerProps> = ({
  repositories,
}) => {
  const repositoryNodes: Repository[] =
    repositories?.edges?.map((edge) => edge.node) ?? [];

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

export default RepositoryListContainer;
