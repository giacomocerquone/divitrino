import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'pages/Home/Home';
import AddPayment from 'pages/Home/AddPayment';
import AddPurchase from 'pages/Home/AddPurchase';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff', paddingHorizontal: 30},
        headerStyle: {shadowColor: 'transparent', elevation: 0},
        headerBackTitle: 'Indietro',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{headerTitle: 'Aggiungi pagamento'}}
      />
      <Stack.Screen
        name="AddPurchase"
        component={AddPurchase}
        options={{headerTitle: 'Aggiungi acquisti'}}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;
