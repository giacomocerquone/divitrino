import { EUR } from "@dinero.js/currencies";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { add, dinero } from "dinero.js";
import React, { FunctionComponent, Ref, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { unit } from "../../../constants/ui";
import usePeopleSelection from "../../../hooks/usePeopleSelection";
import { IUser } from "../../../interfaces";
import { getPurchaseState } from "../../../store";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import { convertToCents, formatMoney } from "../../../utils";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import DatePicker from "../DatePicker";
import PeopleSelector from "../PeopleSelector";

const RecapModal: FunctionComponent<Props> = ({ sheetRef, onDone }) => {
  const snapPoints = useMemo(() => ["60%"], []);
  const { onPersonPress, selectedPeople } = usePeopleSelection(false);
  const { prods } = useSelector(getPurchaseState);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const handleConfirm = (date: Date) => {
    setDate(date);
  };

  const total = useMemo(() => {
    const dineroTot = prods.reduce((tot, prod) => {
      const price = dinero({
        amount: convertToCents(prod.price),
        currency: EUR,
      });

      return add(tot, price);
    }, dinero({ amount: 0, currency: EUR }));

    return formatMoney(dineroTot);
  }, [prods]);

  return (
    <BottomSheetModal
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      )}
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
    >
      <BottomSheetContent headerTitle="Salva acquisto">
        <Input
          style={styles.paragraph}
          autoCapitalize="sentences"
          placeholder="Descrizione"
          value={description}
          onChangeText={setDescription}
        />

        <Text size="s" style={styles.paragraph}>
          <Text text="Totale " />
          <Text text={total} weight="bold" />
        </Text>

        <View style={styles.paragraph}>
          <Text size="s" text="Pagato da" />
          <PeopleSelector
            onPersonPress={onPersonPress}
            selectedPeople={selectedPeople}
          />
        </View>

        <DatePicker onConfirm={handleConfirm} date={date} />

        {/* TODO aggiungere in quale gruppo si sta aggiungendo l'acquisto */}

        <Button
          label="Finito"
          disabled={!selectedPeople[0]}
          onPress={() => onDone(selectedPeople, date, description)}
          style={styles.button}
        />
      </BottomSheetContent>
    </BottomSheetModal>
  );
};

export default RecapModal;

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: unit * 3,
  },
  button: { marginTop: unit * 5 },
});

interface Props {
  sheetRef: Ref<BottomSheetModal>;
  onDone: (
    selectedPeople: IUser["id"][],
    date: Date,
    description: string
  ) => void;
}
