import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Balance from 'pages/Balance/Balance.js';
import People from 'pages/Balance/People';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const BalanceNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {shadowColor: 'transparent', elevation: 0},
        headerBackTitle: 'Indietro',
      }}>
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => null} style={styles.headerBtn}>
              <MaterialCommunityIcons name="plus" color="#212A42" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="People"
        component={People}
        options={{headerTitle: 'Persone'}}
      />
    </Stack.Navigator>
  );
};

export default BalanceNav;

const styles = StyleSheet.create({headerBtn: {marginHorizontal: 20}});
