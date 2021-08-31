import { EUR } from "@dinero.js/currencies";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { add, dinero } from "dinero.js";
import React, { FunctionComponent, Ref, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
import PeopleSelector from "../PeopleSelector";

const RecapModal: FunctionComponent<Props> = ({ sheetRef, onDone }) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const { onPersonPress, selectedPeople } = usePeopleSelection(false);
  const { prods } = useSelector(getPurchaseState);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
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
      <BottomSheetContent headerTitle="Nuova spesa">
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

        <PeopleSelector
          onPersonPress={onPersonPress}
          selectedPeople={selectedPeople}
        />

        <Text size="s" style={styles.paragraph} text="Data" />
        <Button
          onPress={showDatePicker}
          style={styles.dateButton}
          label={format(date, "dd/MM/YYYY")}
        />

        <Button
          label="Finito"
          disabled={!selectedPeople[0]}
          onPress={() => onDone(selectedPeople, date, description)}
          style={styles.button}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </BottomSheetContent>
    </BottomSheetModal>
  );
};

export default RecapModal;

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: unit,
  },
  button: { marginTop: unit * 5 },
  dateButton: {
    paddingVertical: unit,
    paddingHorizontal: unit * 3,
  },
});

interface Props {
  sheetRef: Ref<BottomSheetModal>;
  onDone: (
    selectedPeople: IUser["id"][],
    date: Date,
    description: string
  ) => void;
}
