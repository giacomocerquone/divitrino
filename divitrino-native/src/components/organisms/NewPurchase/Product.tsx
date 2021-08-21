import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import { colors, unit } from "../../../constants/ui";
import { IProduct, IUser } from "../../../interfaces";
import { getActiveGroupUsers } from "../../../store";
import Text from "../../atoms/Text";
import VerticalLine from "../../atoms/VerticalLine";

const debtorsNames = (debtors: IProduct["debtors"], people?: IUser[]) =>
  debtors
    ?.map((debtorId) => people?.find((person) => person.id === debtorId)?.name)
    .join(", ");

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

const Product: FunctionComponent<Props> = ({
  product,
  onPress,
  selected,
  index,
}) => {
  const people = useSelector(getActiveGroupUsers);

  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(index)}>
      <View style={styles.description}>
        <Text size="s" text={product.name} />
        {!!product.debtors?.length && (
          <Text
            text={`Di: ${debtorsNames(product.debtors, people)}`}
            size="xs"
          />
        )}
      </View>
      <VerticalLine />
      <Text size="s" text={product.price} style={styles.price} />
      {selected && <SelectedRibbon />}
    </TouchableOpacity>
  );
};

export default React.memo(Product);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: unit * 2,
    alignItems: "center",
    height: 54,
    paddingHorizontal: unit * 2,
    marginBottom: unit * 3,
  },
  description: { flex: 4 },
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
