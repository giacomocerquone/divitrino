import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Settings from 'pages/Settings';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeNav from './src/pages/HomeNav';

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
            tabBarLabel: 'Acquisti',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={Settings}
          options={{
            tabBarLabel: 'Impostazioni',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
