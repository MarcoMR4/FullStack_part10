import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import { Repositories } from '../types/respository';
import RepositoryItem from './RepositoryItem';

import baseApi from '../constants/baseApi';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container:{
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<Repositories | undefined>();

  const fetchRepositories = async () => {
    const response = await fetch(`${baseApi}repositories`);
    const json = await response.json();
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default RepositoryList;