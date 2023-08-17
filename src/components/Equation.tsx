import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';

interface Props {
  minterms: number[];
}

const Equation = ({minterms}: Props): JSX.Element => {
  const getLetters = () => {
    let max = minterms[0];
    for (const minterm of minterms) {
      if (minterm > max) max = minterm;
    }
    let letters = '';
    for (let i = 0; i < Math.ceil(Math.log2(max)); i++) {
      letters += String.fromCharCode(65 + i);
    }
    return letters.split('').join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formula}>{`F(${getLetters()}) = `}</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon name="sigma" size={30} color={'#000'} />
        <Text style={styles.formula}>m({minterms.join(', ')})</Text>
      </View>
    </View>
  );
};

export default Equation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffde03',
    borderRadius: 12,
    padding: 16,
  },
  formula: {
    flexDirection: 'row',
    color: '#051f21',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
