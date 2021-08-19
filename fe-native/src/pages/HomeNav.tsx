import React, { ReactNode, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import BottomBar from "../components/organisms/Home/BottomBar";
import { colors } from "../constants/ui";
import * as userActions from "../store/userSlice";
import Balance from "./Balance";
import Groups from "./Group";
import Movements from "./Movements";

export type TabsNames = "Movements" | "Balance" | "Groups";
export type TabsMap = Record<TabsNames, ReactNode | null>;
const Tabs: TabsMap = {
  Movements,
  Balance,
  Groups,
};

const HomeNav = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabsNames>("Movements");

  const onLogout = () => {
    Alert.alert("Sei sicuro?", "Vuoi davvero effettuare il logout?", [
      {
        text: "Esci",
        onPress: () => dispatch(userActions.logout()),
      },
      {
        text: "Annulla",
      },
    ]);
  };

  const TabComponent = Tabs[activeTab];

  return (
    <SafeAreaView edges={["top"]} style={styles.root}>
      <View style={{ flex: 1 }}>
        {/* TODO WTF */}
        <TabComponent />
      </View>
      <BottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
    </SafeAreaView>
  );
};

export default HomeNav;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkerWhite,
  },
});
