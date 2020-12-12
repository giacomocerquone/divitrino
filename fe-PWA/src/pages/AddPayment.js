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
    history.push("/");
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="6.50"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Pagante</IonLabel>
              <PeopleSelect onChange={(e) => setPayer(e.target.value)} />
            </IonItem>

            <P>ha restituito denaro a</P>

            <IonItem>
              <IonLabel position="floating">Ricevente</IonLabel>
              <PeopleSelect onChange={(e) => setPayee(e.target.value)} />
            </IonItem>
          </IonList>

          <IonButton onClick={onAdd} color="secondary" expand="block">
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
