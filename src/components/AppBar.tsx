import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
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