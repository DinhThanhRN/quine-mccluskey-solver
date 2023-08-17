import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const [input, setInput] = useState<string>();
  const [minterms, setMinterms] = useState<number[]>([]);
  const [isError, setError] = useState<boolean>(false);

  const validateInput = (input: string) => {
    const arr = input.split('');
    for (const item of arr) {
      if (!isNaN(parseInt(item)) || item === ',' || item === ' ') continue;
      else return false;
    }
    return true;
  };
  const changeMinterms = (input: string) => {
    if (validateInput(input)) {
      setMinterms(
        input
          .split(',')
          .join(' ')
          .split(' ')
          .filter(item => item)
          .map(item => +item),
      );
      setError(false);
    } else {
      setError(true);
    }
  };
  const solve = () => {
    if (isError)
      Alert.alert(
        'The format of input is invalid!',
        'Please check your input again!',
      );
    else if (minterms.length === 0)
      Alert.alert('Minterm is empty!', 'Please check your input!');
    else navigation.navigate('CaculationScreen', {minterms});
  };
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Quine McCluskey Solver</Text>
          <Text style={styles.message}>Enter Function Information</Text>
          <Input
            label="Minterms"
            placeholder="E.g: 0, 1, 2, 3, 4, 5, 6"
            errorMessage={
              isError
                ? 'Numbers can be only separated by spaces and commas.'
                : ''
            }
            inputProps={{
              onChangeText: changeMinterms,
            }}
          />
          <Button label="Solve" style={styles.button} onPress={solve} />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

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
  button: {
    marginTop: 24,
  },
  title: {
    color: '#051f21',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    color: '#051f21',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});
