import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { unit } from "../../../constants/ui";

const Row: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: unit * 4,
    paddingVertical: unit * 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: unit * 2,
    backgroundColor: "#fff",
  },
});
