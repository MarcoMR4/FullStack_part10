import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import repositories from '@/data/REPOSITORIES';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;