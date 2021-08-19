import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../constants/ui";

const VerticalLine: FunctionComponent<Props> = ({ height = 18 }) => {
  return <View style={[styles.root, { height }]} />;
};

export default VerticalLine;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.grey,
    width: 1,
  },
});

interface Props {
  height?: number;
}
