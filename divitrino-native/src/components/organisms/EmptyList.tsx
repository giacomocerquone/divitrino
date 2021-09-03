import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { unit } from "../../constants/ui";
import Text from "../atoms/Text";

const EmptyList: FunctionComponent<Props> = ({ resourceName }) => {
  return (
    <View style={styles.root}>
      <Text
        text={`Nessun ${resourceName} da mostrare.\nCreane uno!`}
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
  resourceName: string;
}
