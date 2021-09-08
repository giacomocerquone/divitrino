import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

import { colors, unit } from "../../../constants/ui";
import { IProduct } from "../../../interfaces";
import * as purchaseActions from "../../../store/purchaseSlice";
import Input from "../../atoms/Input";
import VerticalLine from "../../atoms/VerticalLine";

const initialProdState = {
  name: "",
  price: "",
  debtors: [],
};

const ProductInput: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const [focusedInputIdx, setFocusedInputIdx] = useState(0);
  const [product, setProduct] = useState<IProduct>(initialProdState);

  const onEnter = async () => {
    if (focusedInputIdx < 1) {
      return setFocusedInputIdx((idx) => idx + 1);
    }

    if (!product.name || !product.price) {
      return showMessage({
        description:
          "Devi inserire un nome e un prezzo per aggiungere un prodotto",
        message: "Errore",
        type: "danger",
      });
    }

    dispatch(purchaseActions.addProds([product]));
    setProduct(initialProdState);
    setFocusedInputIdx(0);
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
  nameInput: { flex: 4, borderWidth: 0, fontSize: 16 },
  priceInput: { flex: 1, borderWidth: 0, fontSize: 16 },
});

interface Props {}
