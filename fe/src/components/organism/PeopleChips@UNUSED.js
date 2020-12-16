import { IonChip, IonLabel } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";

const PeopleChips = () => {
  const people = useSelector(getPeople);

  return (
    <>
      {people.map((p) => (
        <IonChip key={p.id} mode="ios" outline color="primary">
          <IonLabel>{p.name}</IonLabel>
        </IonChip>
      ))}
    </>
  );
};

export default PeopleChips;
