import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeNav from 'pages/Home/HomeNav';
import BalanceNav from 'pages/Balance/BalanceNav';

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
          showIcon: true,
          activeTintColor: '#1132D6',
          inactiveTintColor: '#7C8397',
          renderIndicator: () => null,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeNav}
          options={{
            tabBarLabel: 'Spese',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="BalanceTab"
          component={BalanceNav}
          options={{
            tabBarLabel: 'Bilancio',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
