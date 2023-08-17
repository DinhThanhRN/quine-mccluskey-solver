import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
const Button = ({label, onPress, style, textStyle}: Props): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        pressed && {opacity: 0.5},
        style,
      ]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    height: 50,
    padding: 5,
    backgroundColor: '#00696f',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
