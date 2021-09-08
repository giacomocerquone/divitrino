import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { colors, unit } from "../../../constants/ui";
import { IPayment, IPurchase, TMovement } from "../../../interfaces";
import Text from "../../atoms/Text";

const Movement: FunctionComponent<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(item)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={item.payee ? "arrow-forward" : "receipt-outline"}
          color={colors.black}
          size={20}
          style={{ marginHorizontal: unit * 4 }}
        />
        {item.payee ? (
          <View>
            <Text size="xs">
              <Text weight="bold" size="xs" text={item.payer.name} /> ha pagato{" "}
              <Text weight="bold" size="xs" text={item.payee.name} />
            </Text>
            <Text size="xs" text={`aggiunto da ${item.addedBy?.name}`} />
          </View>
        ) : (
          <View>
            <Text size="xs">
              Acquisto pagato da <Text weight="bold" text={item.payer.name} />
            </Text>
            <Text size="xs" text={`aggiunto da ${item.addedBy?.name}`} />
          </View>
        )}
      </View>

      <Ionicons name="open" color={colors.purple} size={unit * 4} />
    </TouchableOpacity>
  );
};

export default React.memo(Movement);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    borderRadius: unit * 2,
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
  onPress: (item: TMovement) => void;
}
