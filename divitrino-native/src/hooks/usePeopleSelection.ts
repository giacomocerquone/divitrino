import { useCallback, useState } from "react";

import { IUser } from "../interfaces";

const usePeopleSelection = (allowMultipleSelection: boolean) => {
  const [selectedPeople, setSelectedPeople] = useState<IUser["id"][]>([]);

  const onPersonPress = useCallback(
    (personId) => {
      const isSelected = selectedPeople.includes(personId);

      setSelectedPeople((people: IUser["id"][]) =>
        !isSelected
          ? allowMultipleSelection
            ? [...people, personId]
            : [personId]
          : people.filter((pId: string) => personId !== pId)
      );
    },
    [allowMultipleSelection, selectedPeople]
  );

  return {
    onPersonPress,
    selectedPeople,
    reset: () => setSelectedPeople([]),
  };
};

export default usePeopleSelection;
