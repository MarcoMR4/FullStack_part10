import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    color: 'white',
    padding: 30,
    gap: 16,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text color="primary" fontWeight="bold">Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;