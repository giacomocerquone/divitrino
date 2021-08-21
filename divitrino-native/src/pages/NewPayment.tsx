import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import PeopleSelector from "../components/organisms/PeopleSelector";
import { colors, unit } from "../constants/ui";
import usePeopleSelection from "../hooks/usePeopleSelection";

const NewPurchase = () => {
  const dispatch = useDispatch();

  const { onPersonPress: onFromPress, selectedPeople: selectedFromPeople } =
    usePeopleSelection(false);
  const { onPersonPress: onToPress, selectedPeople: selectedToPeople } =
    usePeopleSelection(false);

  const onSubmit = () => {
    // TODO submit new purchase to server
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text
          size="m"
          weight="normal"
          text="Nuovo trasferimento"
          style={styles.headerTitle}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text text="Importo" size="m" />
        <Input onChangeText={() => null} placeholder="67.50" />

        <Text text="Chi dà" size="m" />
        <PeopleSelector
          onPersonPress={onFromPress}
          selectedPeople={selectedFromPeople}
        />

        <Text text="Chi riceve" size="m" />
        <PeopleSelector
          onPersonPress={onToPress}
          selectedPeople={selectedToPeople}
        />
      </View>

      <Button
        label="Aggiungi"
        onPress={onSubmit}
        style={{ marginVertical: unit * 2 }}
      />
    </SafeAreaView>
  );
};

export default NewPurchase;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: unit * 5,
    flex: 1,
  },
  header: {
    backgroundColor: colors.darkerWhite,
    alignItems: "center",
    paddingTop: unit * 6,
    paddingBottom: unit * 2,
    marginBottom: unit * 4,
  },
  headerTitle: {
    marginBottom: unit * 2,
  },
});
