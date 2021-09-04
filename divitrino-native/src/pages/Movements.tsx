import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  SectionList,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import EmptyList from "../components/organisms/EmptyList";
import Movement from "../components/organisms/Movements/Movement";
import MovementDetail from "../components/organisms/Movements/MovementDetail";
import PurchaseList from "../components/organisms/Movements/PurchaseList";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { TMovement } from "../interfaces";
import { getActiveGroupId } from "../store";
import * as userActions from "../store/userSlice";

const Movements = () => {
  const groupId = useSelector(getActiveGroupId);
  const { movs, refetch } = useFetchMovements(groupId);
  const [activeMov, setActiveMov] = useState<TMovement>();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const onMovPress = useCallback((movement) => {
    bottomSheetModalRef.current?.present();
    setActiveMov(movement);
  }, []);

  const onLogout = () => {
    Alert.alert("Sei sicuro?", "Vuoi davvero effettuare il logout?", [
      {
        text: "Esci",

        onPress: () => dispatch(userActions.logout()),
      },
      {
        text: "Annulla",
      },
    ]);
  };

  const onAdd = async () => {
    if (groupId) {
      navigate("NewMovement");
    } else {
      showMessage({
        type: "warning",
        description:
          "Non hai ancora un gruppo in cui aggiungere un movimento. Creane uno prima!",
        message: "Attenzione",
      });
    }
  };

  return (
    <>
      <SectionList
        sections={movs}
        contentContainerStyle={styles.root}
        renderItem={({ item }) => <Movement item={item} onPress={onMovPress} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={onLogout}>
              <Ionicons
                name="log-out-outline"
                color={colors.black}
                size={unit * 6}
              />
            </TouchableOpacity>
            <Text size="m" weight="normal" text="Movimenti" align="center" />
            <TouchableOpacity onPress={onAdd}>
              <Ionicons name="add" color={colors.black} size={unit * 6} />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={<EmptyList resourceName="movimento" />}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: unit * 6,
  },
});
