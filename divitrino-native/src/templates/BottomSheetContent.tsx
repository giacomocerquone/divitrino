import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import BottomSheetHeader from "../components/organisms/BottomSheetHeader";
import { colors, unit } from "../constants/ui";
import { useBackHandler } from "../hooks/useBackHandler";

const BottomSheetContent: FunctionComponent<Props> = ({
  headerTitle,
  children,
  contentContainerStyle,
}) => {
  const { dismissAll } = useBottomSheetModal();
  useBackHandler(() => {
    dismissAll();
    return true;
  });

  return (
    <View style={styles.root}>
      <BottomSheetHeader title={headerTitle} />
      <View style={contentContainerStyle}>{children}</View>
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
  contentContainerStyle?: ViewStyle;
}
