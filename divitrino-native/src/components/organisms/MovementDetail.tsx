import { format } from "date-fns";
import { it } from "date-fns/locale";
import { dinero } from "dinero.js";
import { EUR } from "@dinero.js/currencies";
import React, { FunctionComponent, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors, unit } from "../../constants/ui";
import { TMovement } from "../../interfaces";
import BottomSheetContent from "../../templates/BottomSheetContent";
import { formatMoney } from "../../utils";
import Text from "../atoms/Text";

const MovementDetail: FunctionComponent<Props> = ({ movement }) => {
  const amount = useMemo(() => {
    if (movement?.amount) {
      const dAmount = dinero({ amount: movement.amount, currency: EUR });
      return formatMoney(dAmount);
    }

    return "0";
  }, [movement?.amount]);

  if (!movement) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return (
    <BottomSheetContent
      headerTitle={
        movement.payee
          ? `${movement.payer.name} ha pagato ${movement.payee.name}`
          : movement.description
      }
    >
      <Text size="s" style={styles.paragraph}>
        <Text text="Totale " />
        <Text text={amount} weight="bold" />
      </Text>
      {!movement.payee && (
        <Text size="s" style={styles.paragraph}>
          <Text text="Pagato da " />
          <Text text={movement.payer.name} weight="bold" />
        </Text>
      )}

      <Text size="s" style={styles.paragraph}>
        <Text text="Data " />
        <Text
          text={format(new Date(movement.createdAt), "dd MMMM", { locale: it })}
          weight="bold"
        />
      </Text>
    </BottomSheetContent>
  );
};

export default MovementDetail;

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: unit,
  },
});

interface Props {
  movement?: TMovement;
}
