import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import Balances from "./Balances";
import Groups from "./Groups";
import Movements from "./Movements";
import NewPayment from "./NewPayment";
import NewPurchase from "./NewPurchase";

const Tab = createBottomTabNavigator();

const HomeNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movements" component={Movements} />
      <Tab.Screen name="Balance" component={Balances} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="NewPayment" component={NewPayment} />
      <Tab.Screen name="NewPurchase" component={NewPurchase} />
    </Tab.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
