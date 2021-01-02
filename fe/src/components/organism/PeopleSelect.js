import { IonSelect } from "@ionic/react";
import { IonSelectOption } from "components/atoms/CustomIon"
import React from "react";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";

const PeopleSelect = ({ onIonChange, value }) => {
  const people = useSelector(getPeople);
  const animatedBottomsheet = window.screen.width < 1025;

  return (
    <IonSelect
      mode="md"
      onIonChange={onIonChange}
      interface="action-sheet"
      interfaceOptions={{animated: animatedBottomsheet}}
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
