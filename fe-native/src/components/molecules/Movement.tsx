import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import { colors, unit } from "../../constants/ui";
import Text from "../atoms/Text";

// TODO need to check for payments UI
const Movement: FunctionComponent<Props> = ({ item, onPress }) => {
  return (
    <TouchableHighlight style={styles.root} onPress={onPress}>
      <View>
        {item.description && <Text size="xs" text={item.description} />}
        <Text>
          Pagato da <Text weight="bold" size="xxs" text={item.payer} />
        </Text>
      </View>

      <Ionicons name="chevron-forward" color={colors.grey} />
    </TouchableHighlight>
  );
};

export default Movement;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    borderRadius: unit * 2,
    paddingLeft: unit * 14,
    paddingRight: unit * 6,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: unit * 3,
    backgroundColor: colors.white,
  },
});

interface Props {
  item: {
    description: string;
    payer: string;
    createdAt: Date;
  };
  onPress: () => void;
}
