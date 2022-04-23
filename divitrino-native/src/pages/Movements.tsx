import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  SectionList,
  ActivityIndicator,
  ToastAndroid,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import BottomSheet from "../components/organisms/BottomSheet";
import EmptyList from "../components/organisms/EmptyList";
import Header from "../components/organisms/Movements/Header";
import Movement from "../components/organisms/Movements/Movement";
import MovementDetail from "../components/organisms/Movements/MovementDetail";
import PurchaseList from "../components/organisms/Movements/PurchaseList";
import { colors, unit } from "../constants/ui";
import { useBackHandler } from "../hooks/useBackHandler";
import useFetchMovements from "../hooks/useFetchMovements";
import { TMovement } from "../interfaces";
import { getActiveGroupId } from "../store";

const Movements = () => {
  const groupId = useSelector(getActiveGroupId);
  const { movs, refetch, loading, error } = useFetchMovements(groupId);
  const [activeMov, setActiveMov] = useState<TMovement>();
  const [pulledToRefresh, setPulledToRefresh] = useState(false);
  const [backCounter, setBackCounter] = useState(0);
  const isFocused = useIsFocused();

  const closeModal = () => setActiveMov(undefined);

  useBackHandler(() => {
    if (isFocused && backCounter === 0) {
      setBackCounter((c) => c + 1);
      ToastAndroid.show("Premi di nuovo per chiudere uscire", 5000);
      return true;
    }

    return false;
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onMovPress = useCallback((movement) => {
    bottomSheetModalRef.current?.present();
    setActiveMov(movement);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <SectionList
          refreshing={loading && pulledToRefresh}
          onRefresh={async () => {
            setPulledToRefresh(true);
            await refetch();
            setPulledToRefresh(false);
          }}
          sections={movs}
          contentContainerStyle={styles.root}
          renderItem={({ item }) => (
            <Movement item={item} onPress={onMovPress} />
          )}
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
        <BottomSheet onDismiss={closeModal} open={!!activeMov}>
          <MovementDetail
            closeModal={closeModal}
            movement={activeMov}
            refetch={refetch}
          />

          {activeMov && !activeMov?.payee && (
            <PurchaseList movement={activeMov} />
          )}
        </BottomSheet>
      </View>
    </>
  );
};

export default Movements;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
});
