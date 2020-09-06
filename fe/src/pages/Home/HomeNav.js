import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => null} style={styles.cameraBtn}>
              <MaterialCommunityIcons
                name="camera-outline"
                color="#212A42"
                size={26}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => null} style={styles.cameraBtn}>
              <MaterialCommunityIcons name="plus" color="#212A42" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="AddReceipt" component={AddReceipt} />
      <Stack.Screen name="AddPurchase" component={AddPurchase} />
    </Stack.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({cameraBtn: {marginHorizontal: 20}});
