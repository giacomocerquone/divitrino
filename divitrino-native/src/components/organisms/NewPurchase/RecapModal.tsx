import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { parseInt } from "lodash";
import React, { FunctionComponent, Ref, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { unit } from "../../../constants/ui";
import usePeopleSelection from "../../../hooks/usePeopleSelection";
import { IUser } from "../../../interfaces";
import { getPurchaseProducts } from "../../../store";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import PeopleSelector from "../PeopleSelector";

const RecapModal: FunctionComponent<Props> = ({ sheetRef, onDone }) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const { onPersonPress, selectedPeople } = usePeopleSelection(false);
  const prods = useSelector(getPurchaseProducts);

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
          <Text
            text={`€ ${prods.reduce((tot, prod) => {
              return tot + parseInt(prod.price);
            }, 0)}`}
            weight="bold"
          />
        </Text>

        <PeopleSelector
          onPersonPress={onPersonPress}
          selectedPeople={selectedPeople}
        />

        <Text size="s" style={styles.paragraph} text="Data" />
        {/* TODO */}

        <Button
          label="Finito"
          disabled={!selectedPeople[0]}
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
