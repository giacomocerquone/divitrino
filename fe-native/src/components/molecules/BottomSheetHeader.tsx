import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { unit } from "../../constants/ui";
import IconButton from "../atoms/IconButton";
import Text from "../atoms/Text";

const BottomSheetHeader: FunctionComponent<Props> = ({ title }) => {
  const { dismissAll } = useBottomSheetModal();

  return (
    <View style={styles.root}>
      <Text text={title} size="m" weight="normal" />
      <IconButton name="close" onPress={dismissAll} />
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
