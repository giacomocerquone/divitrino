import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "../components/atoms/Text";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import { unit } from "../constants/ui";

const NewPurchase = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text size="m" weight="normal" text="Nuovo acquisto" />
          </View>
        }
        contentContainerStyle={styles.root}
        renderItem={({ item }) => <Product item={item} />}
        ListFooterComponent={<ProductInput />}
      />
    </SafeAreaView>
  );
};

export default NewPurchase;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  header: {
    alignItems: "center",
    paddingTop: unit * 6,
    paddingBottom: unit * 2,
  },
});
