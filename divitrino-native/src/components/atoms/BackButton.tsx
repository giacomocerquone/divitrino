import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, unit } from "../../constants/ui";
import Text from "./Text";

const BackButton = () => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.backButtonContainer, { top: insets.top + unit * 5 }]}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons color={colors.black} name="arrow-back" size={unit * 5} />
        <Text text="Indietro" style={{ marginLeft: unit * 2 }} size="m" />
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
