import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent, ComponentProps } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { colors, unit } from "../../constants/ui";

const IconButton: FunctionComponent<Props> = ({
  name,
  onPress,
  style,
  fontSize,
  size,
  bgColor,
  fontColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.root,
        {
          backgroundColor:
            bgColor || (disabled ? colors.lightPurple : colors.purple),
          borderRadius: size || unit * 8,
          width: size || unit * 8,
          height: size || unit * 8,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Ionicons
        color={fontColor || colors.white}
        name={name}
        size={fontSize || unit * 5}
      />
    </TouchableOpacity>
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
  bgColor?: string;
  fontColor?: string;
  name: ComponentProps<typeof Ionicons.Button>["name"];
  onPress: ComponentProps<typeof TouchableOpacity>["onPress"];
  size?: number;
  fontSize?: number;
  disabled?: boolean;
}