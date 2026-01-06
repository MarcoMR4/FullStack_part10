import { useField } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import Text from '../Text';
import TextInput from './TextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

interface FormikTextInputProps {
  name: string;
  [key: string]: any;
}

const FormikTextInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const inputBorderColor = showError ? styles.errorText.color : theme.colors.primary;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={!!showError}
        style={[styles.textInput, { borderColor: inputBorderColor }]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;