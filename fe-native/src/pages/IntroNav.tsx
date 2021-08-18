import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";

import { colors } from "../constants/ui";
import { getToken } from "../store";
import HomeNav from "./HomeNav";
import Login from "./Login";
import Signup from "./Signup";

const Stack = createNativeStackNavigator();

const IntroNav = () => {
  const token = useSelector(getToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.darkerWhite,
        },
      }}
    >
      {!token ? (
        <Stack.Screen name="Home" component={HomeNav} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default IntroNav;
