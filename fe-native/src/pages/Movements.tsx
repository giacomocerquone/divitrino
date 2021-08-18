import { format } from "date-fns";
import { it } from "date-fns/locale";
import React from "react";
import { StyleSheet, SectionList } from "react-native";

import Text from "../components/atoms/Text";
import Movement from "../components/molecules/Movement";
import { unit } from "../constants/ui";

const Movements = () => {
  const onMovPress = () => {
    console.log("movement pressed");
  };

  return (
    <SectionList
      sections={[]}
      contentContainerStyle={styles.root}
      renderItem={({ item }) => <Movement item={item} onPress={onMovPress} />}
      renderSectionHeader={({ section: { createdAt } }) => (
        <Text size="xs" transform="uppercase">
          {format(new Date(createdAt), "dd MMMM", { locale: it })}
        </Text>
      )}
    />
  );
};

export default Movements;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
});
