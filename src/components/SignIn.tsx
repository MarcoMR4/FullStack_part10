
import { Formik } from 'formik';
import React, { useContext } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './forms/FormikTextInput';
import Text from './Text';

import { useThemeScheme } from '../context/ThemeContext';

import { useApolloClient } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import AuthStorageContext from '../context/AuthStorageContext';
import { useSignIn } from '../hooks/useSignIn';


const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    paddingTop: 40,
    borderRadius: 8,
    gap: 30,
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
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
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be greater or equal to 1')
    .required('Username is required'),
  password: yup
    .string()
    .min(1, 'Password must be greater or equal to 1')
    .required('Password is required'),
});

const SignIn = () => {
  const { themeScheme } = useThemeScheme();
  const { signIn } = useSignIn();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const router = useRouter();

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const result = await signIn(values);
      console.log('result: ', result);
      const accessToken = result?.data?.authenticate?.accessToken;
      if (accessToken && authStorage) {
        await authStorage.setAccessToken(accessToken);
        console.log('Access token saved to storage');
        
        // Reset Apollo cache to refetch queries with new auth token
        await apolloClient.resetStore();
        
        // Navigate to home
        router.replace('/');
      }
    } catch (e) {
      console.error('Error trying to sign in', e);
    }
  };

  const backgroundColor = themeScheme === 'dark' ? '#181818' : '#fff';

  return (
    <Formik
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={{ ...styles.formContainer, backgroundColor }}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <TouchableWithoutFeedback onPress={() => handleSubmit()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;