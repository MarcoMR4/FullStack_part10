import React from 'react';
import {
    TextInput as NativeTextInput,
    TextInputProps as NativeTextInputProps
} from 'react-native';

export interface TextInputProps extends NativeTextInputProps {
  error?: boolean | string;
  style?: any;
}

const TextInput: React.FC<TextInputProps> = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;