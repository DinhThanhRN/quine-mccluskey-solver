import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Color from '../utils/Color';

interface Props {
  children: string;
  onPress?: () => void;
}

const PressableText = ({onPress, children}: Props): JSX.Element => {
  return (
    <Pressable
      style={({pressed}) => [styles.container, pressed && {opacity: 0.5}]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  text: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
