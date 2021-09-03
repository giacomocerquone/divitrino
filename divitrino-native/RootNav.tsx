import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import * as endpoints from "./src/constants/endpoints";
import { colors } from "./src/constants/ui";
import HomeNav from "./src/pages/HomeNav";
import Invite from "./src/pages/Invite";
import Login from "./src/pages/Login";
import NewGroup from "./src/pages/NewGroup";
import NewMovement from "./src/pages/NewMovement";
import NewPayment from "./src/pages/NewPayment";
import NewPurchase from "./src/pages/NewPurchase";
import Signup from "./src/pages/Signup";
import client from "./src/services/client";
import { getToken } from "./src/store";

const Stack = createNativeStackNavigator();

const RootNav = () => {
  const token = useSelector(getToken);
  const insets = useSafeAreaInsets();
  const [deepLink, setDeepLink] = useState<Linking.ParsedURL>();

  useEffect(() => {
    const handleUrl = ({ url }: { url: string }) => {
      const parsedUrl = Linking.parse(url);
      if (parsedUrl?.path === "join") {
        setDeepLink(parsedUrl);
      }
    };

    Linking.addEventListener("url", handleUrl);

    const fetchInitialUrl = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          handleUrl({ url });
        }
      } catch (e) {
        console.log("error fetching initialUrl", e);
      }
    };

    fetchInitialUrl();

    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);

  useEffect(() => {
    // todo add condition to check if deepLink.path === 'join'
    if (!deepLink) return;

    const joinGroup = async () => {
      try {
        await client.post(endpoints.join, {
          inviteId: +deepLink.queryParams.inviteId,
          code: deepLink.queryParams.code,
        });

        setDeepLink(undefined);
        showMessage({
          type: "success",
          description: "Ti sei unito al gruppo con successo",
          message: "Grandioso!",
        });
        // navigate to groups
      } catch (e) {
        setDeepLink(undefined); // are we sure?
        showMessage({
          type: "danger",
          description:
            "Ci sono stati problemi nell'unirti al gruppo. Riprova più tardi",
          message: "Errore",
        });
        console.log("error joining the group", e);
      }
    };

    if (token) {
      joinGroup();
      return;
    }

    return showMessage({
      type: "warning",
      description:
        "Per unirti al gruppo, accedi o registrati senza chiudere quest'app",
      message: "Attenzione",
    });
  }, [token, deepLink]);

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
            <Stack.Screen name="NewMovement" component={NewMovement} />
            <Stack.Screen name="NewGroup" component={NewGroup} />
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
