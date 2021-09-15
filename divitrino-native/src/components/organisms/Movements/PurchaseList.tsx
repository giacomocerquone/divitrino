import { EUR } from "@dinero.js/currencies";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { add, dinero } from "dinero.js";
import React, { FunctionComponent, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { unit } from "../../../constants/ui";
import useFetchPurchase from "../../../hooks/useFetchPurchase";
import { IUser, TMovement } from "../../../interfaces";
import { formatMoney } from "../../../utils";
import Text from "../../atoms/Text";
import { generateDineroObject } from "../Balance/UserBalance";

type TProduct = {
  name: string;
  pricePerDebtor: number;
  debtors: IUser[];
};

const Product: FunctionComponent<{
  item: TProduct;
}> = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: unit,
        alignItems: "center",
      }}
    >
      <View>
        <Text text={item.name} />
        <Text
          size="xs"
          text={`Di: ${item.debtors
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
  );
};

const PurchaseList: FunctionComponent<Props> = ({ movement }) => {
  const purchase = useFetchPurchase(movement && !movement.payee && movement.id);
  const insets = useSafeAreaInsets();

  const purchaseAmount = useMemo(() => {
    if (purchase?.products) {
      const dAmount = purchase.products.reduce((tot, prod) => {
        const totalProductCost = dinero({
          amount: Math.round(prod.pricePerDebtor * prod.debtors.length),
          currency: EUR,
        });

        return add(tot, totalProductCost);
      }, dinero({ amount: 0, currency: EUR }));

      return formatMoney(dAmount);
    }
  }, [purchase?.products]);

  return (
    <BottomSheetFlatList
      data={purchase?.products as unknown as TProduct[]}
      contentContainerStyle={[
        styles.root,
        { paddingBottom: insets.bottom * 10 }, // TODO maybe useless
      ]}
      ListHeaderComponent={
        <>
          {!!purchaseAmount && (
            <Text size="s" style={styles.paragraph}>
              <Text text="Totale " />
              <Text text={purchaseAmount} weight="bold" />
            </Text>
          )}
          <Text
            text="Prodotti"
            size="m"
            weight="normal"
            style={{ marginBottom: unit * 2, marginTop: unit * 5 }}
          />
        </>
      }
      stickyHeaderIndices={[0]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Product item={item} />}
    />
  );
};

export default PurchaseList;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  paragraph: {
    marginVertical: unit,
  },
});

interface Props {
  movement?: TMovement;
}
