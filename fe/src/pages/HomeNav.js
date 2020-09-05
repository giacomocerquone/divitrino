import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'pages/Home';
import AddReceipt from 'pages/AddReceipt';
import AddPurchase from 'pages/AddPurchase';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddReceipt" component={AddReceipt} />
      <Stack.Screen name="AddPurchase" component={AddPurchase} />
    </Stack.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
