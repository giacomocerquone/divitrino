import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, unit } from "../../../constants/ui";
import useFetchPurchase from "../../../hooks/useFetchPurchase";
import { IProduct, IUser, TMovement } from "../../../interfaces";
import Text from "../../atoms/Text";
import { generateDineroObject } from "../Balance/UserBalance";

const Product: FunctionComponent<{ item: IProduct }> = ({ item }) => {
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

  return (
    <BottomSheetFlatList
      data={purchase?.products}
      contentContainerStyle={[
        styles.root,
        { paddingBottom: insets.bottom * 10 },
      ]}
      ListHeaderComponent={
        <View style={{ backgroundColor: colors.white }}>
          <Text
            text="Prodotti"
            size="m"
            weight="normal"
            style={{ marginBottom: unit * 2 }}
          />
        </View>
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
});

interface Props {
  movement?: TMovement;
}
