import constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: constants.statusBarHeight + 20,
    backgroundColor: '#24292e',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Text color="primary" fontWeight="bold">Repositores Application</Text>
    </View>
  );
};

export default AppBar;