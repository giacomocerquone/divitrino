import {
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import IntroNav from "./src/pages/IntroNav";
import store from "./src/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <IntroNav />
      </NavigationContainer>
    </Provider>
  );
}
