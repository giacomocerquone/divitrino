import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";

import { colors } from "./src/constants/ui";
import HomeNav from "./src/pages/HomeNav";
import Invite from "./src/pages/Invite";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import { getToken } from "./src/store";

const Stack = createNativeStackNavigator();

const RootNav = () => {
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
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeNav} />
          <Stack.Screen name="Invite" component={Invite} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNav;
