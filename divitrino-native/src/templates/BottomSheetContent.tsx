import {
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import BottomSheetHeader from "../components/organisms/BottomSheetHeader";
import { colors, unit } from "../constants/ui";
import { useBackHandler } from "../hooks/useBackHandler";

const BottomSheetContent: FunctionComponent<Props> = ({
  headerTitle,
  children,
  contentContainerStyle,
  style,
}) => {
  const { dismissAll } = useBottomSheetModal();
  useBackHandler(() => {
    dismissAll();
    return true;
  });

  return (
    <BottomSheetScrollView
      style={[styles.root, style]}
      contentContainerStyle={{ padding: unit * 5 }}
    >
      <BottomSheetHeader title={headerTitle} />
      <View style={contentContainerStyle}>{children}</View>
    </BottomSheetScrollView>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
  },
});

interface Props {
  style?: ViewStyle;
  headerTitle: string;
  children: ReactNode;
  contentContainerStyle?: ViewStyle;
}
