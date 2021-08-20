import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import { unit } from "../../../constants/ui";
import IconButton from "../../atoms/IconButton";

const width = Dimensions.get("window").width;

const AddBox = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <IconButton
          name="receipt"
          onPress={() => navigate("NewPurchase")}
          size={unit * 10}
          fontSize={unit * 6}
        />
        <IconButton
          name="arrow-forward"
          onPress={() => navigate("NewPayment")}
          size={unit * 10}
          fontSize={unit * 6}
        />
      </View>
    </View>
  );
};

export default AddBox;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: unit * 25,
    width,
    alignItems: "center",
  },
  container: {
    width: unit * 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
