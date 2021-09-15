import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FunctionComponent, Ref, useMemo } from "react";

import { unit } from "../../../constants/ui";
import usePeopleSelection from "../../../hooks/usePeopleSelection";
import { IUser } from "../../../interfaces";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import Button from "../../atoms/Button";
import PeopleSelector from "../PeopleSelector";

const AssignModal: FunctionComponent<Props> = ({ sheetRef, onDone }) => {
  const snapPoints = useMemo(() => ["30%"], []);
  const { onPersonPress, selectedPeople } = usePeopleSelection(true);

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
      <BottomSheetContent headerTitle="Seleziona">
        <PeopleSelector
          onPersonPress={onPersonPress}
          selectedPeople={selectedPeople}
        />

        <Button
          label="fatto"
          onPress={() => onDone(selectedPeople)}
          style={{ marginTop: unit * 5 }}
        />
      </BottomSheetContent>
    </BottomSheetModal>
  );
};

export default AssignModal;

interface Props {
  sheetRef: Ref<BottomSheetModal>;
  onDone: (selectedPeople: IUser["id"][]) => void;
}
