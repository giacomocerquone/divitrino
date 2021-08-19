import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors, unit } from "../../../constants/ui";
import { IProduct } from "../../../interfaces";
import Text from "../../atoms/Text";
import VerticalLine from "../../atoms/VerticalLine";

const SelectedRibbon = () => {
  return (
    <View
      style={{
        borderTopEndRadius: unit * 2,
        borderBottomEndRadius: unit * 2,
        backgroundColor: colors.purple,
        top: 0,
        bottom: 0,
        width: unit * 2,
        position: "absolute",
        right: 0,
      }}
    />
  );
};

const ProductInput: FunctionComponent<Props> = ({
  product,
  onPress,
  selected,
  index,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(index)}>
      <Text style={styles.name} size="s" text={product.name} />
      <VerticalLine />
      <Text size="s" text={product.price} style={styles.price} />
      {selected && <SelectedRibbon />}
    </TouchableOpacity>
  );
};

export default React.memo(ProductInput);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: unit * 2,
    alignItems: "center",
    paddingVertical: unit * 3,
    paddingHorizontal: unit * 2,
    marginBottom: unit * 3,
  },
  name: { flex: 4 },
  price: {
    flex: 1,
    position: "relative",
    left: unit * 2,
  },
});

interface Props {
  product: IProduct;
  onPress: (idx: number) => void;
  selected?: boolean;
  index: number;
}
