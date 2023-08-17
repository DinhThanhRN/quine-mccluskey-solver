import React from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

const InputNameScreen = (): JSX.Element => {
  const navigation = useNavigation<any>();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Name The Inputs</Text>
          <Input label="Enter 2 letters" placeholder="AB" />
          <Button
            label="Solve"
            style={styles.button}
            onPress={() => navigation.navigate('CaculationScreen')}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default InputNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    padding: 12,
    backgroundColor: '#cce8ea',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: '#051f21',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
});
