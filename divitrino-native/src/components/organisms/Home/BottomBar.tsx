import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, unit } from "../../../constants/ui";
import { TabsNames } from "../../../pages/HomeNav";
import IconButton from "../../atoms/IconButton";

const BottomBar: FunctionComponent<Props> = ({ activeTab, setActiveTab }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <IconButton
        size={40}
        name="people"
        bgColor={activeTab === "Groups" ? colors.purple : colors.lightPurple}
        onPress={() => setActiveTab("Groups")}
      />
      <IconButton
        fontSize={unit * 10}
        size={unit * 20}
        name="list"
        onPress={() => setActiveTab("Movements")}
        bgColor={activeTab === "Movements" ? colors.purple : colors.lightPurple}
        style={{
          borderWidth: 8,
          borderColor: colors.darkerWhite,
          position: "relative",
          top: -unit * 6,
        }}
      />
      <IconButton
        size={40}
        name="cash"
        bgColor={activeTab === "Balance" ? colors.purple : colors.lightPurple}
        onPress={() => setActiveTab("Balance")}
      />
    </View>
  );
};

export default BottomBar;

interface Props {
  activeTab: TabsNames;
  setActiveTab: (name: TabsNames) => void;
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: unit * 8,
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
