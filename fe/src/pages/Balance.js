import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Title from "components/atoms/Title";
import PageContainer from "components/atoms/PageContainer";
import { getPeople, getDebts } from "store/app.reducer";
import PayeeReport from "components/organism/PayeeReport";
import AppVersionString from "components/atoms/AppVersionString";
import promptsSlice from "reducers/prompts";
import movementsSlice from "reducers/movements";

const Balance = () => {
  const people = useSelector(getPeople);
  const debts = useSelector(getDebts);

  const dispatch = useDispatch();
  
  const equalize = (id) => {
    const payments = [];
    Object.keys(debts).forEach(id2 => {
      const amount = debts[id][id2]?.getAmount();
      if (amount) return payments.push({
        id: uuidv4(),
        payer: id,
        payee: id2,
        amount,
      });
      const amountReverse = debts[id2][id]?.getAmount();
      if (amountReverse) return payments.push({
        id: uuidv4(),
        payer: id2,
        payee: id,
        amount: amountReverse,
      });
    });
    payments.forEach(payment => dispatch(movementsSlice.actions.addMovement(payment)));
  };

  const onPressEqualize = () => {
    dispatch(
      promptsSlice.actions.openAlert({
        header: "Info",
        message: "Chi ha pagato?",
        inputs: [
          ...people.map((p) => ({
            name: p.name,
            label: p.name,
            type: "radio",
            value: p.id,
          })),
        ],
        buttons: [
          {
            text: "Annulla",
            role: "cancel",
            handler: () => null,
          },
          {
            text: "Pareggia",
            handler: (id) => equalize(id),
          },
        ],
      })
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0 20px 10px 20px" }}>
          <Title>Bilancio</Title>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageContainer>
          {people.map((p) => (
            <PayeeReport key={p.id} person={p} />
          ))}
          <div style={{ marginTop: 10 }}>
            <IonButton
              mode="ios"
              onClick={onPressEqualize}
              color="success"
              expand="block"
            >
              Pareggia i conti
            </IonButton>
            <IonButton
              mode="ios"
              routerLink="/persone"
              color="primary"
              expand="block"
            >
              Gestisci gruppo
            </IonButton>
            <AppVersionString />
          </div>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Balance;
