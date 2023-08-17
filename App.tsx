import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import CaculationScreen from './src/screens/CaculationScreen';
import InputNameScreen from './src/screens/InputNameScreen';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CaculationScreen" component={CaculationScreen} />
        <Stack.Screen name="InputNameScreen" component={InputNameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
