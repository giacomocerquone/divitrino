import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Balance from './Balance.js';
import People from './People';
import AddPerson from './AddPerson';

const Stack = createStackNavigator();

const BalanceNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff', paddingHorizontal: 30},
        headerStyle: {shadowColor: 'transparent', elevation: 0},
        headerBackTitle: 'Indietro',
      }}>
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="People"
        component={People}
        options={{headerTitle: 'Persone'}}
      />
      <Stack.Screen
        name="AddPerson"
        component={AddPerson}
        options={{headerTitle: 'Aggiungi persona'}}
      />
    </Stack.Navigator>
  );
};

export default BalanceNav;
