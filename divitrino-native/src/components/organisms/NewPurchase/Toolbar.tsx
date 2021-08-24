import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { colors, unit } from "../../../constants/ui";
import IconButton from "../../atoms/IconButton";

const Toolbar: FunctionComponent<Props> = ({
  onSelectAll,
  onDelete,
  onAssign,
}) => {
  return (
    <View style={styles.root}>
      <IconButton
        style={styles.button}
        size={32}
        name="camera"
        disabled
        onPress={() => null}
      />
      <IconButton
        style={styles.button}
        size={32}
        name="checkmark-done"
        onPress={onSelectAll}
      />
      <IconButton
        style={styles.button}
        size={32}
        name="people"
        onPress={onAssign}
      />
      <IconButton
        style={styles.button}
        size={32}
        name="close"
        onPress={onDelete}
        bgColor={colors.red}
      />
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginHorizontal: unit * 2,
  },
});

interface Props {
  onSelectAll: () => void;
  onDelete: () => void;
  onAssign: () => void;
}
