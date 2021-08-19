import { format } from "date-fns";
import { it } from "date-fns/locale";
import React, { useMemo } from "react";
import { StyleSheet, SectionList } from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Movement from "../components/molecules/Movement";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { IPayment, IPurchase } from "../interfaces";
import { getGroupId } from "../store";

const Movements = () => {
  const groupId = useSelector(getGroupId);
  const movs = useFetchMovements(groupId);

  const onMovPress = () => {
    console.log("movement pressed");
  };

  const sections = useMemo(() => {
    const groupedByCreatedAt = [...movs?.purchases, ...movs?.payments].reduce<
      Record<string, (IPurchase & IPayment)[]>
    >((sects, mov: any) => {
      // TODO replace any on mov
      if (sects[mov.createdAt]) {
        sects[mov.createdAt].push(mov);
      } else {
        sects[mov.createdAt] = [mov];
      }

      return sects;
    }, {});

    return Object.keys(groupedByCreatedAt).map((date) => ({
      createdAt: date,
      data: groupedByCreatedAt[date],
    }));
  }, [movs]);

  return (
    <SectionList
      sections={sections}
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
