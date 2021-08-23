import React, { ReactNode, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import BottomBar from "../components/organisms/Home/BottomBar";
import { colors } from "../constants/ui";
import useFetchGroups from "../hooks/useFetchGroups";
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
  const [activeTab, setActiveTab] = useState<TabsNames>("Movements");
  // fetching groups and relative users since it's a crucial information
  // for all the features
  useFetchGroups();

  const Scene = Tabs[activeTab];

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ flex: 1 }}>
        {/* TODO WTF */}
        <Scene />
      </View>
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
