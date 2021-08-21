import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { IUser } from "../../interfaces";
import { getActiveGroupUsers } from "../../store";
import Chip from "../atoms/Chip";

const PeopleSelector: FunctionComponent<Props> = ({
  onPersonPress,
  selectedPeople,
}) => {
  const people = useSelector(getActiveGroupUsers);

  return (
    <View style={styles.root}>
      {(people || []).map((person) => (
        <Chip
          text={person.name}
          onPress={() => onPersonPress(person.id)}
          active={selectedPeople.includes(person.id)}
        />
      ))}
    </View>
  );
};

export default PeopleSelector;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

interface Props {
  selectedPeople: IUser["id"][];
  onPersonPress: (personId: IUser["id"]) => void;
}
