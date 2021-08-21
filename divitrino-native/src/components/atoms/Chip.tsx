import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { colors, unit } from "../../constants/ui";
import Text from "./Text";

const Chip: FunctionComponent<Props> = ({ text, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.root, active && styles.rootActive]}
      onPress={onPress}
    >
      <Text
        text={text}
        size="xs"
        color={active ? colors.white : colors.black}
      />
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  root: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: unit * 4,
    paddingVertical: unit * 2,
    paddingHorizontal: unit * 4,
  },
  rootActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
});

interface Props {
  text: string;
  active?: boolean;
  onPress: () => void;
}
