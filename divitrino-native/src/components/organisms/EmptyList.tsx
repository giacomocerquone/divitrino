import React, { FunctionComponent } from "react";
import { Image, StyleSheet, View } from "react-native";

import empty from "../../../assets/empty.png";
import { unit } from "../../constants/ui";
import Text from "../atoms/Text";

const EmptyList: FunctionComponent<Props> = ({ resourceName, message }) => {
  return (
    <View style={styles.root}>
      <Image
        source={empty}
        style={{ height: unit * 60 }}
        resizeMode="contain"
      />
      <Text
        text={message || `Nessun ${resourceName} da mostrare.\nCreane uno!`}
        align="center"
      />
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginTop: unit * 6,
    marginBottom: unit * 20,
  },
});

interface Props {
  resourceName?: string;
  message?: string;
}
