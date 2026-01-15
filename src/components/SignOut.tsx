import { useApolloClient } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import AuthStorageContext from '../context/AuthStorageContext';
import { useThemeScheme } from '../context/ThemeContext';
import { getTheme } from '../theme';
import Text from './Text';

const SignOut = () => {
  const { themeScheme } = useThemeScheme();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const router = useRouter();
  const theme = getTheme(themeScheme);

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: 40,
      borderRadius: 8,
      gap: 30,
      flex: 1,
    },
    button: {
      backgroundColor: theme.colors.error,
      borderRadius: 4,
      alignItems: 'center',
      paddingVertical: 12,
      marginTop: 12,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    message: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  const handleSignOut = async () => {
    try {
      if (authStorage) {
        await authStorage.removeAccessToken();
        console.log('Access token removed from storage');
        
        // Reset Apollo Client cache
        await apolloClient.resetStore();
        
        // Navigate to home
        router.replace('/');
      }
    } catch (e) {
      console.error('Error trying to sign out', e);
    }
  };

  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.textPrimary;

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Text style={{ ...styles.message, color: textColor }}>
        Are you sure you want to sign out?
      </Text>
      <TouchableWithoutFeedback onPress={handleSignOut}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignOut;
