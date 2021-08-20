import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import BottomSheetHeader from "../components/organisms/BottomSheetHeader";
import { colors, unit } from "../constants/ui";

const BottomSheetContent: FunctionComponent<Props> = ({
  headerTitle,
  children,
}) => {
  return (
    <View style={styles.root}>
      <BottomSheetHeader title={headerTitle} />
      <View>{children}</View>
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  root: {
    padding: unit * 5,
    backgroundColor: colors.white,
  },
});

interface Props {
  headerTitle: string;
  children: ReactNode;
}
