import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'pages/Home/Home';
import AddReceipt from 'pages/Home/AddReceipt';
import AddPurchase from 'pages/Home/AddPurchase';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {shadowColor: 'transparent', elevation: 0}}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen name="AddReceipt" component={AddReceipt} />
      <Stack.Screen name="AddPurchase" component={AddPurchase} />
    </Stack.Navigator>
  );
};

export default HomeNav;
