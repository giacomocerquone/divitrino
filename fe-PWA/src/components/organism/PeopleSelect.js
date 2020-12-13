import { IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";

const PeopleSelect = ({ onIonChange, value }) => {
  const people = useSelector(getPeople);

  return (
    <IonSelect
      mode="md"
      onIonChange={onIonChange}
      interface="action-sheet"
      value={value}
      okText="Seleziona"
      cancelText="Chiudi"
      placeholder="Scegli una persona"
    >
      {people.map((p) => (
        <IonSelectOption key={p.id} value={p.id}>
          {p.name}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default PeopleSelect;
