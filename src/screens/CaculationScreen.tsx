import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Equation from '../components/Equation';
import Table from '../components/Table';
import {useNavigation, useRoute} from '@react-navigation/native';
import {quineMcCluskey} from '../utils';
import Color from '../utils/Color';
import PressableText from '../components/PressableText';
import Collapsible from 'react-native-collapsible';
import {convertToAlphabets} from '../utils/function';
import Chart from '../components/Chart';
import Button from '../components/Button';

const CaculationScreen = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();
  const minterms = route.params.minterms;
  const result = quineMcCluskey(minterms);

  const [isCollapsed, setCollapsed] = useState(true);
  const renderPrimeImplicants = ({item}: any) => {
    return (
      <Table
        key={item.implicant}
        title="Finding Prime Implicants"
        data={item}
        unmarkedImplicants={result.unmarkedImplicants}
      />
    );
  };
  const primeImplicantChart = result.primeImplicants
    .flat()
    .filter(item => result.unmarkedImplicants.includes(item.implicant));
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        <Equation minterms={minterms} />

        <PressableText onPress={() => setCollapsed(!isCollapsed)}>
          Press to get detail.
        </PressableText>
        <Collapsible collapsed={isCollapsed}>
          {result.primeImplicants?.map(item => renderPrimeImplicants({item}))}
          <View style={styles.box}>
            <Text style={styles.text}>The Prime Implicants Are</Text>
            <Text style={styles.text}>
              {result.unmarkedImplicants
                ?.map(item => convertToAlphabets(item))
                .join(', ')}
            </Text>
          </View>
          <Chart
            title="Prime Implicant Chart"
            headers={minterms}
            data={primeImplicantChart}
          />
        </Collapsible>
        <View style={styles.box}>
          <Text style={styles.text}>Quine-McCluskey expression</Text>
          <Text style={styles.text}>
            Y ={' '}
            {result.essentialPrimeImplicants
              ?.map(item => convertToAlphabets(item))
              .join(' + ')}
          </Text>
        </View>
        <Button
          label="New Function"
          style={styles.button}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default CaculationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 36,
    // justifyContent: 'center',
  },
  box: {
    width: '100%',
    minHeight: 96,
    backgroundColor: Color.lightblue,
    justifyContent: 'space-evenly',
    borderRadius: 12,
    marginVertical: 20,
  },
  text: {
    color: Color.white,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    height: 50,
    marginVertical: 12,
    backgroundColor: Color.darkgreen,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#051f21',
  },
});
