import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Repository, RepositoryEdge } from "../../types/respository";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  container: {
    padding: 10,
  },
  pickerContainer: {
    marginBottom: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface RepositoryListContainerProps {
  repositories: {
    edges: RepositoryEdge[];
  };
  onSelectRepository?: (id: string) => void;
  onEndReached?: () => void;
  loading?: boolean;
}

const RepositoryListContainer: React.FC<RepositoryListContainerProps> = ({
  repositories,
  onSelectRepository,
  onEndReached,
  loading,
}) => {
  const repositoryNodes: Repository[] =
    repositories?.edges?.map((edge) => edge.node) ?? [];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectRepository?.(item.id)}
            activeOpacity={0.7}
          >
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.container}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading) {
            onEndReached?.();
          }
        }}
      />
    </View>
  );
};

export default RepositoryListContainer;
