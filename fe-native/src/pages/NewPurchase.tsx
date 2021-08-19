import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import Toolbar from "../components/organisms/NewPurchase/Toolbar";
import { colors, unit } from "../constants/ui";
import { getPurchaseProducts } from "../store";

type TSelectedProds = Record<number, boolean>;

const keyboardDismissProp =
  Platform.OS === "ios"
    ? { keyboardDismissMode: "on-drag" }
    : { onScrollEndDrag: Keyboard.dismiss };

const NewPurchase = () => {
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
    const allIdxsTrue = prods.reduce<TSelectedProds>((acc, _, idx) => {
      return { ...acc, [idx]: true };
    }, {});

    setSelectedProdsIndexes(allIdxsTrue);
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
            <Toolbar onSelectAll={onSelectAll} />
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
