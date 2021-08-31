import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, SectionList, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import Movement from "../components/organisms/Movement";
import MovementDetail from "../components/organisms/MovementDetail";
import { colors, unit } from "../constants/ui";
import useFetchMovements from "../hooks/useFetchMovements";
import { TMovement } from "../interfaces";
import { getActiveGroupId } from "../store";
import * as userActions from "../store/userSlice";

const Movements = () => {
  const groupId = useSelector(getActiveGroupId);
  const movs = useFetchMovements(groupId);
  const [activeMov, setActiveMov] = useState<TMovement>();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);

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
            <TouchableOpacity onPress={() => navigate("NewMovement")}>
              <Ionicons name="add" color={colors.black} size={unit * 6} />
            </TouchableOpacity>
          </View>
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
        <MovementDetail movement={activeMov} />
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
