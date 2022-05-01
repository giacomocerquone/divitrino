import React, {
  FunctionComponent,
  ReactChildren,
  ReactElement,
  ReactNode,
} from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import BottomSheetHeader from "../components/organisms/BottomSheetHeader";
import { colors, unit } from "../constants/ui";
import { useBackHandler } from "../hooks/useBackHandler";

const BottomSheetContent: FunctionComponent<Props> = ({
  headerTitle,
  children,
  contentContainerStyle,
  style,
  onDismiss,
}) => {
  useBackHandler(() => {
    onDismiss();
    return true;
  });

  return (
    <ScrollView
      style={[styles.root, style]}
      contentContainerStyle={{ padding: unit * 5 }}
    >
      <BottomSheetHeader title={headerTitle} />
      <View style={contentContainerStyle}>{children}</View>
    </ScrollView>
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
  children: ReactElement;
  contentContainerStyle?: ViewStyle;
  onDismiss: () => void;
}
