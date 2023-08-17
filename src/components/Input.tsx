import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import Color from '../utils/Color';

interface Props {
  label: string;
  placeholder?: string;
  errorMessage?: string;
  inputProps?: TextInputProps;
}

const Input = ({
  label,
  placeholder,
  errorMessage,
  inputProps,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, errorMessage ? {color: 'red'} : {}]}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          errorMessage ? {borderBottomColor: Color.red} : {},
        ]}
        {...inputProps}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    // height: 96,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 8,
    marginVertical: 8,
    borderColor: '#99aeb0',
    borderBottomWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#c0dadc',
  },
  label: {
    color: '#00696f',
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: Color.red,
  },
});
