import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { colors } from "./src/constants/ui";
import HomeNav from "./src/pages/HomeNav";
import Invite from "./src/pages/Invite";
import Login from "./src/pages/Login";
import NewPayment from "./src/pages/NewPayment";
import NewPurchase from "./src/pages/NewPurchase";
import Signup from "./src/pages/Signup";
import { getToken } from "./src/store";

const Stack = createNativeStackNavigator();

const RootNav = () => {
  const token = useSelector(getToken);
  const insets = useSafeAreaInsets();

  return (
    <>
      <FlashMessage style={{ paddingTop: insets.top }} />
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
            <Stack.Screen name="NewPayment" component={NewPayment} />
            <Stack.Screen name="NewPurchase" component={NewPurchase} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootNav;
