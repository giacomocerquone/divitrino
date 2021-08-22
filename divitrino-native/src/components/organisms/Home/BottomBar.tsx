import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors, unit } from "../../../constants/ui";
import { TabsNames } from "../../../pages/HomeNav";
import AddButton from "../../atoms/AddButton";
import IconButton from "../../atoms/IconButton";
import AddBox from "./AddBox";

const BottomBar: FunctionComponent<Props> = ({
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const [addBoxVisible, setAddBoxVisible] = useState(false);

  const onAdd = () => {
    setAddBoxVisible((v) => !v);
  };

  return (
    <View style={styles.root}>
      <IconButton
        size={40}
        name="list"
        bgColor={activeTab === "Movements" ? colors.purple : colors.lightPurple}
        onPress={() => setActiveTab("Movements")}
      />
      <IconButton
        size={40}
        name="cash"
        bgColor={activeTab === "Balance" ? colors.purple : colors.lightPurple}
        onPress={() => setActiveTab("Balance")}
      />
      {addBoxVisible && <AddBox />}
      <AddButton
        onPress={onAdd}
        style={{ position: "relative", top: -unit * 6 }}
      />
      <IconButton
        size={40}
        name="people"
        bgColor={activeTab === "Groups" ? colors.purple : colors.lightPurple}
        onPress={() => setActiveTab("Groups")}
      />
      <IconButton
        size={40}
        name="exit"
        onPress={onLogout}
        bgColor={colors.lightPurple}
      />
    </View>
  );
};

export default BottomBar;

interface Props {
  activeTab: TabsNames;
  setActiveTab: (name: TabsNames) => void;
  onLogout: () => void;
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: unit * 8,
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
