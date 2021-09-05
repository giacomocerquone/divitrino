import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import { colors, unit } from "../../../constants/ui";
import { getActiveGroupId } from "../../../store";
import * as userActions from "../../../store/userSlice";
import Text from "../../atoms/Text";

const Header: FunctionComponent<Props> = () => {
  const groupId = useSelector(getActiveGroupId);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

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
    <View style={styles.header}>
      <TouchableOpacity onPress={onLogout}>
        <Ionicons name="log-out-outline" color={colors.black} size={unit * 6} />
      </TouchableOpacity>
      <Text size="m" weight="normal" text="Movimenti" align="center" />
      <TouchableOpacity onPress={onAdd}>
        <Ionicons name="add" color={colors.black} size={unit * 6} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: unit * 6,
  },
});

interface Props {}
