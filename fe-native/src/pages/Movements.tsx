import { format } from "date-fns";
import { it } from "date-fns/locale";
import React from "react";
import { StyleSheet, SectionList } from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Movement from "../components/molecules/Movement";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { getGroupId } from "../store";

const Movements = () => {
  const groupId = useSelector(getGroupId);
  const movs = useFetchMovements(groupId);

  const onMovPress = () => {
    console.log("movement pressed");
  };

  return (
    <SectionList
      sections={movs}
      contentContainerStyle={styles.root}
      renderItem={({ item }) => <Movement item={item} onPress={onMovPress} />}
      renderSectionHeader={({ section: { createdAt } }) => (
        <Text
          size="xs"
          transform="uppercase"
          weight="bold"
          color={colors.purple}
          style={{ marginBottom: unit * 3 }}
        >
          {format(new Date(createdAt), "dd MMMM", { locale: it })}
        </Text>
      )}
    />
  );
};

export default Movements;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5, paddingTop: unit * 6 },
});
