import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { unit } from "../../constants/ui";
import Text from "../atoms/Text";

const BottomSheetHeader: FunctionComponent<Props> = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text text={title} size="m" weight="normal" />
    </View>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: unit * 4,
  },
});

interface Props {
  title: string;
}
