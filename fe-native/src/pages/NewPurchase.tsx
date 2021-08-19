import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "../components/atoms/Text";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import Toolbar from "../components/organisms/NewPurchase/Toolbar";
import { unit } from "../constants/ui";

const NewPurchase = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              size="m"
              weight="normal"
              text="Nuovo acquisto"
              style={styles.headerTitle}
            />
            <Toolbar />
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
    marginTop: unit * 6,
    marginBottom: unit * 6,
  },
  headerTitle: {
    marginBottom: unit * 2,
  },
});
