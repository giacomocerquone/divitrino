import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import Title from "components/atoms/Title";
import PageContainer from "components/atoms/PageContainer";
import { add } from "ionicons/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getMovements } from "store/app.reducer";
import MovementRow from "components/organism/MovementRow";

const Movements = () => {
  const movements = useSelector(getMovements);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0 20px 20px 20px"}}>
          <Title>Movimenti</Title>
          <ButtonsWrapper style={{"max-width": "768px", margin: "auto", padding: "0 20px"}}>
            <IonButton mode="ios" routerLink="/nuova-spesa">
              <IonIcon slot="start" icon={add} />
              Acquisti
            </IonButton>
            <IonButton mode="ios" routerLink="/nuovo-pagamento">
              <IonIcon slot="start" icon={add} />
              Pagamento
            </IonButton>
          </ButtonsWrapper>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageContainer>
          <IonList>
            {movements.map((m) => (
              <MovementRow key={m.id} movement={m} />
            ))}
          </IonList>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Movements;

export const ButtonsWrapper = styled.div`
  display: flex;

  & > ion-button {
    flex: 1;
  }
`;
