import React, { FunctionComponent } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Text from "../components/atoms/Text";
import { unit } from "../constants/ui";

const UserDebts: FunctionComponent<Props> = () => {
  return <View />;
};

const Balance = () => {
  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={[]}
      ListHeaderComponent={
        <Text
          size="xl"
          weight="normal"
          text="Bilancio"
          style={{ marginVertical: 24 }}
        />
      }
      renderItem={({ item }) => <UserDebts item={item} />}
    />
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
});

interface Props {
  item: any; // TODO
}
