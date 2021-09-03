import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { unit } from "../../constants/ui";
import IconButton from "./IconButton";
import Text from "./Text";

const BackButton = () => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.backButtonContainer, { top: insets.top }]}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <IconButton name="arrow-back" />
        <Text text="Indietro" style={{ marginLeft: unit * 2 }} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    left: unit * 4,
  },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
  },
});
