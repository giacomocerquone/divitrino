import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { getPeople, getDebits } from "store/app.reducer";

const SingleReport = ({p, isPayer = false}) => {
  const people = useSelector(getPeople);
  const debits = useSelector((state) => getDebits(state));

  const result = people.map((person) => {
      if (person.id === p.id) return;
      
      const dinero = isPayer
        ? debits[p.id][person.id]
        : debits[person.id][p.id];
      if (dinero.getAmount() <= 0) return; 

      return (
        <div key={person.id}>
          <span>
            - {isPayer ? 'a' : 'da'} <b>{person.name}</b>: {dinero.toFormat('$0,0.00')}
          </span>
        </div>
      );
    }).filter((el) => !!el);

  return result.length ? result : (
    <small style={{opacity: 0.6}}>- Vuoto -</small> 
  );
};

const PayeeReport = ({ person }) => {
  const people = useSelector(getPeople);

  return (
    <IonCard mode="ios">
      <IonCardContent>
        <IonCardTitle style={{ fontSize: 20 }}>{person.name}</IonCardTitle>
        <IonCardSubtitle style={{ marginTop: 10 }}>deve dare</IonCardSubtitle>
        <SingleReport p={person} isPayer />

        <IonCardSubtitle style={{ marginTop: 10 }}>deve ricevere</IonCardSubtitle>
        <SingleReport p={person} />
      </IonCardContent>
    </IonCard>
  );
};

export default PayeeReport;
