import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import PeopleSelector from "../components/organisms/PeopleSelector";
import * as endpoints from "../constants/endpoints";
import { unit } from "../constants/ui";
import usePeopleSelection from "../hooks/usePeopleSelection";
import client from "../services/client";
import { getActiveGroupId } from "../store";

const NewPayment = () => {
  const { onPersonPress: onFromPress, selectedPeople: selectedFromPeople } =
    usePeopleSelection(false);
  const { onPersonPress: onToPress, selectedPeople: selectedToPeople } =
    usePeopleSelection(false);
  const groupId = useSelector(getActiveGroupId);
  const { goBack } = useNavigation();

  const [amount, setAmount] = useState("");

  const [payerId] = selectedFromPeople;
  const [payeeId] = selectedToPeople;

  const onSubmit = async () => {
    try {
      if (payerId === payeeId) {
        return showMessage({
          type: "warning",
          message: "Un pagamento deve avere creditore e debitore diverso",
        });
      }

      await client.post(endpoints.payments, {
        amount: parseInt(amount, 10),
        payerId,
        payeeId,
        groupId,
      });

      goBack();
    } catch (e) {
      console.log("error adding payment", e?.response?.data);
      showMessage({
        type: "danger",
        message: "Errore",
        description: "Errore aggiunta pagamento",
      });
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text text="Importo" size="m" />
        <Input onChangeText={setAmount} placeholder="67.50" value={amount} />

        <Text text="Chi dà" size="m" style={styles.section} />
        <PeopleSelector
          onPersonPress={onFromPress}
          selectedPeople={selectedFromPeople}
        />

        <Text text="Chi riceve" size="m" style={styles.section} />
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
    </>
  );
};

export default NewPayment;

const styles = StyleSheet.create({
  section: {
    marginTop: unit * 4,
  },
});
