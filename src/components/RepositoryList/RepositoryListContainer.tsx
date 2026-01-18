import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Repository, RepositoryEdge } from "../../types/respository";
import RepositoryDetails from "./RepositoryDetails";
import RepositoryItem from "./RepositoryItem";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const repositoryNodes: Repository[] =
    repositories?.edges?.map((edge) => edge.node) ?? [];

  if (selectedId) {
    return (
      <View style={{ flex: 1 }}>
        <Button title="Return to List" onPress={() => setSelectedId(null)} />
        <RepositoryDetails repositoryId={selectedId} />
      </View>
    );
  }

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelectedId(item.id)}
          activeOpacity={0.7}
        >
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default RepositoryListContainer;
