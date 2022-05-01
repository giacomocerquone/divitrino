import React, { FunctionComponent } from "react";

import { unit } from "../../../constants/ui";
import usePeopleSelection from "../../../hooks/usePeopleSelection";
import { IUser } from "../../../interfaces";
import BottomSheetContent from "../../../templates/BottomSheetContent";
import Button from "../../atoms/Button";
import BottomSheet from "../BottomSheet";
import PeopleSelector from "../PeopleSelector";

const AssignModal: FunctionComponent<Props> = ({ open, onDone, onDismiss }) => {
  const { onPersonPress, selectedPeople, reset } = usePeopleSelection(true);

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        reset();
        onDismiss();
      }}
    >
      <BottomSheetContent headerTitle="Seleziona" onDismiss={onDismiss}>
        <>
          <PeopleSelector
            onPersonPress={onPersonPress}
            selectedPeople={selectedPeople}
          />

          <Button
            label="fatto"
            onPress={() => onDone(selectedPeople)}
            style={{ marginTop: unit * 5 }}
          />
        </>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default AssignModal;

interface Props {
  open: boolean;
  onDone: (selectedPeople: IUser["id"][]) => void;
  onDismiss: () => void;
}
