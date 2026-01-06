
import { Formik } from 'formik';
import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import FormikTextInput from './forms/FormikTextInput';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};


const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 30,
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
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

const SignIn = () => {
  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
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