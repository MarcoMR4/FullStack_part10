import constants from 'expo-constants';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useThemeScheme } from '../context/ThemeContext';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: constants.statusBarHeight + 20,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ...
});

const AppBar = () => {
  const { themeScheme, toggleTheme } = useThemeScheme();

  return (
    <View style={styles.container}>
      <Text color="primary" fontWeight="bold">Repositores Application</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={toggleTheme}>
          {themeScheme === 'dark' ? (
            <MaterialIcons name="brightness-7" size={28} color="#fff" />
          ) : (
            <MaterialIcons name="brightness-5" size={28} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;