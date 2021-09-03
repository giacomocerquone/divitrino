import { EUR } from "@dinero.js/currencies";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { dinero } from "dinero.js";
import React, { FunctionComponent, useMemo } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  FlatList,
} from "react-native";

import * as endpoints from "../../../constants/endpoints";
import { colors, unit } from "../../../constants/ui";
import useFetchPurchase from "../../../hooks/useFetchPurchase";
import { IUser, TMovement } from "../../../interfaces";
import client from "../../../services/client";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import { formatMoney } from "../../../utils";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { generateDineroObject } from "../Balance/UserBalance";

const MovementDetail: FunctionComponent<Props> = ({ movement, refetch }) => {
  const { dismissAll } = useBottomSheetModal();
  const purchase = useFetchPurchase(movement && !movement.payee && movement.id);

  console.log("PUR", purchase?.products);

  const amount = useMemo(() => {
    if (movement?.amount) {
      const dAmount = dinero({ amount: movement.amount, currency: EUR });
      return formatMoney(dAmount);
    }

    return "0";
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
      if (movement?.payee) {
        // it's a payment
        await client.delete(endpoints.payment, {
          params: { paymentId: movement.id },
        });
        dismissAll();
      } else if (movement) {
        // it's a purchase
        await client.delete(endpoints.purchase, {
          params: { purchaseId: movement.id },
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
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return (
    <BottomSheetContent
      contentContainerStyle={{ alignItems: "flex-start", flexGrow: 1 }}
      headerTitle={
        movement.payee
          ? `${movement.payer.name} ha pagato ${movement.payee.name}`
          : movement.description
      }
    >
      <Button
        label="Elimina"
        onPress={onPressDelete}
        style={styles.deleteButton}
      />
      <Text size="s" style={styles.paragraph}>
        <Text text="Totale " />
        <Text text={amount} weight="bold" />
      </Text>
      <Text size="s" style={styles.paragraph}>
        <Text text="Data " />
        <Text
          text={format(new Date(movement.date), "dd MMMM", { locale: it })}
          weight="bold"
        />
      </Text>
      {!movement.payee && (
        <>
          <Text size="s" style={styles.paragraph}>
            <Text text="Pagato da " />
            <Text text={movement.payer.name} weight="bold" />
          </Text>
          <Text text="Lista" style={styles.paragraph} />

          {/* TODO needs ui improvs */}
          <FlatList
            data={purchase?.products}
            contentContainerStyle={{
              paddingTop: unit * 4,
              flexGrow: 1,
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: unit,
                  alignItems: "flex-end",
                }}
              >
                <View>
                  <Text text={item.name} />
                  <Text
                    size="xs"
                    text={`Acquistato da ${item.debtors
                      .map((debtor) => (debtor as IUser).name)
                      .join(", ")}`}
                  />
                </View>
                <Text
                  size="m"
                  text={generateDineroObject(
                    (item as any).pricePerDebtor * item.debtors.length
                  )}
                />
              </View>
            )}
          />
        </>
      )}
    </BottomSheetContent>
  );
};

export default MovementDetail;

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: unit,
  },
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
