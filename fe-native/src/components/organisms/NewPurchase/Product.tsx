import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IProduct } from "../../../interfaces";

const Product: FunctionComponent<Props> = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});

interface Props {
  item: IProduct;
}
