import { EUR } from "@dinero.js/currencies";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { dinero } from "dinero.js";
import React, { FunctionComponent, useMemo } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

import * as endpoints from "../../../constants/endpoints";
import { colors, unit } from "../../../constants/ui";
import { useBackHandler } from "../../../hooks/useBackHandler";
import { TMovement } from "../../../interfaces";
import client from "../../../services/client";
import { formatMoney } from "../../../utils";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import BottomSheetHeader from "../BottomSheetHeader";

const MovementDetail: FunctionComponent<Props> = ({ movement, refetch }) => {
  const { dismissAll } = useBottomSheetModal();

  useBackHandler(() => {
    dismissAll();
    return true;
  });

  const paymentAmount = useMemo(() => {
    if (movement?.amount) {
      const dAmount = dinero({ amount: movement.amount, currency: EUR });
      return formatMoney(dAmount);
    }
  }, [movement?.amount]);

  const onPressDelete = () => {
    Alert.alert("Sei sicuro?", "Vuoi davvero eliminare il movimento?", [
      {
        text: "Elimina",
        onPress: onDelete,
      },
      {
        text: "Annulla",
      },
    ]);
  };

  const onDelete = async () => {
    try {
      if (movement?.id) {
        await client.delete(endpoints.movement, {
          params: { movementId: movement.id },
        });
      }

      await refetch();
      dismissAll();
    } catch (e) {
      console.log("error deleting movement", e);
    }
  };

  if (!movement) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <BottomSheetHeader
        title={
          movement.payee
            ? `${movement.payer.name} ha pagato ${movement.payee.name}`
            : movement.description
        }
      />

      <Button
        label="Elimina"
        onPress={onPressDelete}
        style={styles.deleteButton}
      />
      <Text size="s" style={styles.paragraph}>
        <Text text="Data " />
        <Text
          text={format(new Date(movement.date), "dd MMMM", { locale: it })}
          weight="bold"
        />
      </Text>
      <Text size="s" style={styles.paragraph}>
        <Text text="Aggiunto da " />
        <Text text={movement.addedBy?.name} weight="bold" />
      </Text>
      {!movement.payee && (
        <Text size="s" style={styles.paragraph}>
          <Text text="Pagato da " />
          <Text text={movement.payer.name} weight="bold" />
        </Text>
      )}
      {!!paymentAmount && (
        <Text size="s" style={styles.paragraph}>
          <Text text="Totale " />
          <Text text={paymentAmount} weight="bold" />
        </Text>
      )}
    </View>
  );
};

export default MovementDetail;

const styles = StyleSheet.create({
  root: { alignItems: "flex-start", padding: unit * 5, paddingBottom: 0 },
  paragraph: {
    marginVertical: unit,
  },
  loader: { justifyContent: "center", alignItems: "center", flex: 1 },
  deleteButton: {
    marginBottom: unit * 4,
    backgroundColor: colors.red,
    paddingHorizontal: unit * 2,
    paddingVertical: unit,
  },
});

interface Props {
  movement?: TMovement;
  refetch: () => Promise<void>;
}
