import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, unit } from "../../constants/ui";

const AddButton: FunctionComponent<Props> = ({ onPress, style }) => {
  return (
    <View style={[styles.root, style]}>
      <Ionicons.Button
        iconStyle={{ fontSize: unit * 15, marginRight: 0, marginLeft: 2 }}
        name="add"
        backgroundColor={colors.pink}
        borderRadius={unit * 16}
        onPress={onPress}
        style={{
          margin: 0,
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
          width: unit * 16,
          height: unit * 16,
        }}
      />
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    width: unit * 20,
    height: unit * 20,
    borderRadius: unit * 20,
    backgroundColor: colors.darkerWhite,
  },
});

interface Props {
  onPress: () => void;
  style?: ViewStyle;
}
