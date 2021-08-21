import { useCallback, useState } from "react";

import { IUser } from "../interfaces";

const usePeopleSelection = (multipleSelection: boolean) => {
  const [selectedPeople, setSelectedPeople] = useState<IUser["id"][]>([]);

  const onPersonPress = useCallback(
    (personId) => {
      const isSelected = selectedPeople.includes(personId);

      setSelectedPeople((people: IUser["id"][]) =>
        !isSelected
          ? multipleSelection
            ? [...people, personId]
            : [personId]
          : people.filter((pId: string) => personId !== pId)
      );
    },
    [multipleSelection, selectedPeople]
  );

  return {
    onPersonPress,
    selectedPeople,
  };
};

export default usePeopleSelection;
