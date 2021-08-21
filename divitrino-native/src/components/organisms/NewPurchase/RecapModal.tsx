import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FunctionComponent, Ref, useMemo } from "react";
import { StyleSheet } from "react-native";

import { unit } from "../../../constants/ui";
import usePeopleSelection from "../../../hooks/usePeopleSelection";
import { IUser } from "../../../interfaces";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import PeopleSelector from "../PeopleSelector";

const RecapModal: FunctionComponent<Props> = ({ sheetRef, onDone }) => {
  const snapPoints = useMemo(() => ["30%"], []);
  const { onPersonPress, selectedPeople } = usePeopleSelection(false);

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
      <BottomSheetContent headerTitle="Spesa">
        <Text size="s" style={styles.paragraph}>
          <Text text="Totale " />
          <Text text={`€ da calcolare`} weight="bold" />
          {/* TODO */}
        </Text>

        <PeopleSelector
          onPersonPress={onPersonPress}
          selectedPeople={selectedPeople}
        />

        <Text size="s" style={styles.paragraph} text="Data" />
        {/* TODO */}

        <Button
          label="Aggiungi"
          onPress={() => onDone(selectedPeople)}
          style={styles.button}
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
});

interface Props {
  sheetRef: Ref<BottomSheetModal>;
  onDone: (selectedPeople: IUser["id"][]) => void;
}
