import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { colors, unit } from "../../constants/ui";
import { TabsNames } from "../../pages/HomeNav";
import AddButton from "../atoms/AddButton";
import IconButton from "../atoms/IconButton";

const BottomBar: FunctionComponent<Props> = ({
  activeTab,
  setActiveTab,
  onLogout,
  onAdd,
}) => {
  return (
    <View style={styles.root}>
      <IconButton
        name="list"
        active={activeTab === "Movements"}
        onPress={() => setActiveTab("Movements")}
      />
      <IconButton
        name="cash"
        active={activeTab === "Balances"}
        onPress={() => setActiveTab("Balances")}
      />
      <AddButton
        onPress={onAdd}
        style={{ position: "relative", top: -unit * 6 }}
      />
      <IconButton
        name="people"
        active={activeTab === "Groups"}
        onPress={() => setActiveTab("Groups")}
      />
      <IconButton name="exit" onPress={onLogout} />
    </View>
  );
};

export default BottomBar;

interface Props {
  activeTab: TabsNames;
  setActiveTab: (name: TabsNames) => void;
  onAdd: () => void;
  onLogout: () => void;
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: unit * 8,
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
});
