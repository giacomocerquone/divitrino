import React, { FunctionComponent } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Text from "../components/atoms/Text";
import PageHeader from "../components/organisms/PageHeader";
import { unit } from "../constants/ui";

const UserDebts: FunctionComponent<Props> = () => {
  return <View />;
};

const Balance = () => {
  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={[]}
      ListHeaderComponent={<PageHeader title="Bilancio" />}
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
