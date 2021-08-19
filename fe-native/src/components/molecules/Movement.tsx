import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { colors, unit } from "../../constants/ui";
import { IPayment, IPurchase } from "../../interfaces";
import Text from "../atoms/Text";

// TODO need to check for payments UI
const Movement: FunctionComponent<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View>
        {!!item.description && <Text size="s" text={item.description} />}
        <Text size="xs">
          Pagato da <Text weight="bold" size="xs" text={item.payer.name} />
        </Text>
      </View>

      <Ionicons name="open" color={colors.purple} size={unit * 4} />
    </TouchableOpacity>
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
    paddingVertical: unit * 4,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: unit * 3,
    backgroundColor: colors.white,
  },
});

interface Props {
  item: IPurchase & IPayment;
  onPress: () => void;
}
