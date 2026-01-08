import { useField } from 'formik';
import React from 'react';
import { useThemeScheme } from '../../context/ThemeContext';
import { getTheme } from '../../theme';
import Text from '../Text';
import TextInput from './TextInput';

// Los estilos ahora se obtienen desde theme.forms

interface FormikTextInputProps {
  name: string;
  [key: string]: any;
}

const FormikTextInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const { themeScheme } = useThemeScheme();
  const themed = getTheme(themeScheme);

  const inputBorderColor = showError ? themed.forms.errorColor : themed.colors.textPrimary;

  const placeholderTextColor = themed.forms.placeholder;
  
  const errorTextStyle = {
    marginTop: themed.forms.errorMarginTop,
    color: themed.forms.errorColor,
    fontSize: themed.forms.errorFontSize,
  };
  const textInputStyle = {
    borderWidth: themed.forms.textInputBorderWidth,
    borderRadius: themed.forms.textInputBorderRadius,
    padding: themed.forms.textInputPadding,
  };

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={!!showError}
        style={[textInputStyle, { borderColor: inputBorderColor }]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {showError && <Text style={errorTextStyle}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;