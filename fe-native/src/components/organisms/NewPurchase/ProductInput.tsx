import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { colors, unit } from "../../../constants/ui";
import { IProduct } from "../../../interfaces";
import * as purchaseActions from "../../../store/purchaseSlice";
import Input from "../../atoms/Input";
import VerticalLine from "../../atoms/VerticalLine";

const ProductInput: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const [focusedInputIdx, setFocusedInputIdx] = useState(0);
  const [product, setProduct] = useState<IProduct>({
    name: "",
    price: "",
  });

  const onEnter = () => {
    if (focusedInputIdx < 1) {
      return setFocusedInputIdx((idx) => idx + 1);
    }

    dispatch(purchaseActions.addProds([product]));
  };

  return (
    <View style={styles.root}>
      <Input
        autoCapitalize="sentences"
        style={styles.nameInput}
        placeholder="Nome"
        onSubmitEditing={onEnter}
        onFocus={() => setFocusedInputIdx(0)}
        focused={focusedInputIdx === 0}
        value={product.name}
        onChangeText={(name) => setProduct((p) => ({ ...p, name }))}
      />
      <VerticalLine />
      <Input
        style={styles.priceInput}
        placeholder="Prezzo"
        onSubmitEditing={onEnter}
        onFocus={() => setFocusedInputIdx(1)}
        focused={focusedInputIdx === 1}
        keyboardType="numeric"
        value={product.price}
        onChangeText={(price) => setProduct((p) => ({ ...p, price }))}
      />
    </View>
  );
};

export default ProductInput;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: unit * 2,
    alignItems: "center",
  },
  nameInput: { flex: 4, borderWidth: 0 },
  priceInput: { flex: 1, borderWidth: 0 },
});

interface Props {}
