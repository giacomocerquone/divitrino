import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import Toolbar from "../components/organisms/NewPurchase/Toolbar";
import { colors, unit } from "../constants/ui";
import { getPurchaseProducts } from "../store";
import * as purchaseActions from "../store/purchaseSlice";

type TSelectedProds = Record<string, boolean>;

const keyboardDismissProp =
  Platform.OS === "ios"
    ? { keyboardDismissMode: "on-drag" }
    : { onScrollEndDrag: Keyboard.dismiss };

const NewPurchase = () => {
  const dispatch = useDispatch();
  const prods = useSelector(getPurchaseProducts);
  const [selectedProdsIndexes, setSelectedProdsIndexes] =
    useState<TSelectedProds>({});

  const onProductPress = useCallback(
    (idx) => {
      setSelectedProdsIndexes((idxs) => ({
        ...idxs,
        [idx]: !selectedProdsIndexes[idx],
      }));
    },
    [selectedProdsIndexes]
  );

  const onSelectAll = () => {
    const areAllSelected = Object.values(Array.from(prods.keys())).every(
      (index) => selectedProdsIndexes[index]
    );
    const newIndexes = prods.reduce<TSelectedProds>((acc, _, idx) => {
      return { ...acc, [idx]: !areAllSelected };
    }, {});

    setSelectedProdsIndexes(newIndexes);
  };

  const onDelete = () => {
    dispatch(
      purchaseActions.delProds(
        Object.keys(selectedProdsIndexes)
          .filter((index) => selectedProdsIndexes[index])
          .map((index) => parseInt(index, 10))
      )
    );
    setSelectedProdsIndexes({});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* @ts-ignore waiting on https://github.com/facebook/react-native/pull/26422 */}
      <FlatList
        {...keyboardDismissProp}
        data={prods}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              size="m"
              weight="normal"
              text="Nuovo acquisto"
              style={styles.headerTitle}
            />
            <Toolbar onSelectAll={onSelectAll} onDelete={onDelete} />
          </View>
        }
        contentContainerStyle={styles.root}
        renderItem={({ item, index }) => (
          <Product
            product={item}
            selected={selectedProdsIndexes[index]}
            onPress={onProductPress}
            index={index}
          />
        )}
        ListFooterComponent={<ProductInput />}
      />
    </SafeAreaView>
  );
};

export default NewPurchase;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5, paddingBottom: unit * 4 },
  header: {
    backgroundColor: colors.darkerWhite,
    alignItems: "center",
    paddingTop: unit * 6,
    paddingBottom: unit * 2,
    marginBottom: unit * 4,
  },
  headerTitle: {
    marginBottom: unit * 2,
  },
});
