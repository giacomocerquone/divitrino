import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";

const PayeeReport = ({ person }) => {
  const people = useSelector(getPeople);

  return (
    <IonCard mode="ios">
      <IonCardContent>
        <IonCardTitle style={{ fontSize: 20 }}>{person.name}</IonCardTitle>
        <IonCardSubtitle>deve dare</IonCardSubtitle>
        {people.map(
          (p, i) => p.id !== person.id && <p key={p.id}>a {p.name}</p>
        )}
        <IonCardSubtitle>deve ricevere</IonCardSubtitle>
        {people.map(
          (p, i) => p.id !== person.id && <p key={p.id}>da {p.name}</p>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default PayeeReport;
