import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { colors, unit } from "../../../constants/ui";
import IconButton from "../../atoms/IconButton";

const Toolbar: FunctionComponent<Props> = ({ onDelete }) => {
  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <IconButton
          style={styles.button}
          size={32}
          name="close"
          onPress={onDelete}
        />
      </View>
    </View>
  );
};

export default Toolbar;

interface Props {
  onDelete: () => null;
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: colors.darkerWhite,
    paddingBottom: unit * 6,
  },
  toolbar: { flexDirection: "row", alignItems: "center" },
  button: {
    marginHorizontal: unit * 2,
  },
});
