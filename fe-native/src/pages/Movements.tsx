import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, SectionList, View } from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Movement from "../components/molecules/Movement";
import MovementDetail from "../components/organisms/MovementDetail";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { TMovement } from "../interfaces";
import { getGroupId } from "../store";

const Movements = () => {
  const groupId = useSelector(getGroupId);
  const movs = useFetchMovements(groupId);
  const [activeMov, setActiveMov] = useState<TMovement>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const onMovPress = useCallback((movement) => {
    bottomSheetModalRef.current?.present();
    setActiveMov(movement);
  }, []);

  return (
    <>
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
      <BottomSheetModal
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <MovementDetail movement={activeMov} />
      </BottomSheetModal>
    </>
  );
};

export default Movements;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5, paddingTop: unit * 6 },
});
