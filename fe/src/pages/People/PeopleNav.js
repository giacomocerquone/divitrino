import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import People from 'pages/People/People';
import AddPerson from 'pages/People/AddPerson.js';

const Stack = createStackNavigator();

const PeopleNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {shadowColor: 'transparent', elevation: 0}}}>
      <Stack.Screen name="People" component={People} />
      <Stack.Screen name="AddPerson" component={AddPerson} />
    </Stack.Navigator>
  );
};

export default PeopleNav;

const styles = StyleSheet.create({});
