import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import DatePicker from "../components/organisms/DatePicker";
import PeopleSelector from "../components/organisms/PeopleSelector";
import * as endpoints from "../constants/endpoints";
import { unit } from "../constants/ui";
import usePeopleSelection from "../hooks/usePeopleSelection";
import client from "../services/client";
import { getActiveGroupId } from "../store";
import { convertToCents } from "../utils";

const NewPayment = () => {
  const { onPersonPress: onFromPress, selectedPeople: selectedFromPeople } =
    usePeopleSelection(false);
  const { onPersonPress: onToPress, selectedPeople: selectedToPeople } =
    usePeopleSelection(false);
  const groupId = useSelector(getActiveGroupId);
  const { goBack } = useNavigation();

  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [payerId] = selectedFromPeople;
  const [payeeId] = selectedToPeople;

  const handleConfirm = (date: Date) => {
    setDate(date);
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      if (payerId === payeeId) {
        return showMessage({
          type: "warning",
          message: "Attenzione",
          description: "Un pagamento deve avere creditore e debitore diversi",
        });
      }

      await client.post(endpoints.payment, {
        amount: convertToCents(amount),
        payerId,
        payeeId,
        groupId,
        date,
      });

      goBack();
    } catch (e) {
      console.log("error adding payment", e?.response?.data);
      showMessage({
        type: "danger",
        message: "Errore",
        description: "Errore aggiunta pagamento",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text text="Importo" size="m" />
        <Input
          onChangeText={setAmount}
          placeholder="67.50"
          value={amount}
          keyboardType="decimal-pad"
        />

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

        <DatePicker onConfirm={handleConfirm} date={date} />
      </View>

      <Button
        disabled={submitting || !payerId || !payeeId || !amount}
        label="Salva"
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
