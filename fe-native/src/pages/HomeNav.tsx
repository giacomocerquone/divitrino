import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import BottomBar from "../components/molecules/BottomBar";
import { colors } from "../constants/ui";
import * as userActions from "../store/userSlice";
import Balances from "./Balances";
import Groups from "./Groups";
import Movements from "./Movements";

export type TabsNames = "Movements" | "Balances" | "Groups";
export type TabsMap = Record<TabsNames, ReactNode | null>;
const tabs: TabsMap = {
  Movements,
  Balances,
  Groups,
};

const HomeNav = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabsNames>("Movements");

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.root}>
      <View style={{ flex: 1 }}>{tabs[activeTab]}</View>
      <BottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        onAdd={() => null}
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
