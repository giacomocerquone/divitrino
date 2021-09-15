import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, SectionList, ActivityIndicator } from "react-native";
// import { SceneMap } from "react-native-tab-view";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import EmptyList from "../components/organisms/EmptyList";
import Header from "../components/organisms/Movements/Header";
import Movement from "../components/organisms/Movements/Movement";
import MovementDetail from "../components/organisms/Movements/MovementDetail";
import PurchaseList from "../components/organisms/Movements/PurchaseList";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { TMovement } from "../interfaces";
import { getActiveGroupId } from "../store";

const Movements = () => {
  const groupId = useSelector(getActiveGroupId);
  const { movs, refetch, loading, error } = useFetchMovements(groupId);
  const [activeMov, setActiveMov] = useState<TMovement>();
  const [pulledToRefresh, setPulledToRefresh] = useState(false);

  console.log(pulledToRefresh);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const onMovPress = useCallback((movement) => {
    bottomSheetModalRef.current?.present();
    setActiveMov(movement);
  }, []);

  // const FirstRoute = () => (
  //   <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
  // );

  // const SecondRoute = () => (
  //   <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  // );

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  return (
    <>
      <SectionList
        refreshing={loading && pulledToRefresh}
        onRefresh={async () => {
          setPulledToRefresh(true);
          await refetch();
          setPulledToRefresh(false);
        }}
        sections={movs}
        contentContainerStyle={styles.root}
        renderItem={({ item }) => <Movement item={item} onPress={onMovPress} />}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.purple} />
          ) : !error ? (
            <EmptyList resourceName="movimento" />
          ) : null
        }
        renderSectionHeader={({ section: { dateFmt } }) => (
          <Text
            size="xs"
            transform="uppercase"
            weight="bold"
            color={colors.purple}
            style={{ marginBottom: unit * 3 }}
          >
            {dateFmt}
          </Text>
        )}
        keyExtractor={(item) => item.id}
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
        <MovementDetail movement={activeMov} refetch={refetch} />

        {activeMov && !activeMov?.payee && (
          <PurchaseList movement={activeMov} />
        )}
      </BottomSheetModal>
    </>
  );
};

export default Movements;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
});
