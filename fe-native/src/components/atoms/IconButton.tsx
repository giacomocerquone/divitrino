import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent, ComponentProps } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, unit } from "../../constants/ui";

const IconButton: FunctionComponent<Props> = ({
  active,
  name,
  onPress,
  style,
  fontSize,
  iconSize,
}) => {
  return (
    <View style={[styles.root, style]}>
      <Ionicons.Button
        iconStyle={{ fontSize: fontSize || unit * 5, marginRight: 0 }}
        name={name}
        backgroundColor={active ? colors.purple : colors.lightPurple}
        borderRadius={iconSize || unit * 8}
        onPress={onPress}
        style={{
          margin: 0,
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
          width: iconSize || unit * 8,
          height: iconSize || unit * 8,
        }}
      />
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  style?: ViewStyle;
  active?: boolean;
  name: ComponentProps<typeof Ionicons.Button>["name"];
  onPress: ComponentProps<typeof Ionicons.Button>["onPress"];
  fontSize?: number;
  iconSize?: number;
}
