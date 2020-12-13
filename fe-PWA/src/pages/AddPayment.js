import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import movementsSlice from "reducers/movements";
import styled from "styled-components";
import Dinero from "dinero.js";
import { v4 as uuidv4 } from "uuid";
import PeopleSelect from "components/organism/PeopleSelect";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";

const AddPayment = ({ history }) => {
  const [payer, setPayer] = useState(null);
  const [payee, setPayee] = useState(null);
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();

  const onAdd = () => {
    if (!payer || !payee || !amount) {
      // TODO warning
    } else {
      dispatch(
        movementsSlice.actions.addMovement({
          id: uuidv4(),
          payer,
          payee,
          amount: Dinero({
            amount: parseInt(amount.replace(",", "").replace(".", ""), 10),
          }),
        })
      );
      history.goBack();
    }
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>Aggiungi Pagamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer>
          <IonList style={{ marginBottom: 20 }}>
            <IonItem>
              <IonLabel position="floating">Importo</IonLabel>
              <IonInput
                type="number"
                value={amount}
                onIonChange={(e) => setAmount(e.detail.value)}
                placeholder="6.50"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Pagante</IonLabel>
              <PeopleSelect
                value={payer}
                onIonChange={(e) => setPayer(e.detail.value)}
              />
            </IonItem>

            <P>ha restituito denaro a</P>

            <IonItem>
              <IonLabel position="floating">Ricevente</IonLabel>
              <PeopleSelect
                value={payee}
                onIonChange={(e) => setPayee(e.detail.value)}
              />
            </IonItem>
          </IonList>

          <IonButton mode="ios" onClick={onAdd} color="primary" expand="block">
            Aggiungi
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default AddPayment;

const P = styled.p`
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 10px;
`;
