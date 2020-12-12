import React from "react";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonList,
  IonPage,
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
      <IonContent fullscreen>
        <PageContainer>
          <Title>Movimenti</Title>

          <IonList>
            {movements.map((m) => (
              <MovementRow key={m.id} movement={m} />
            ))}
          </IonList>
          <ButtonsWrapper>
            <IonButton>
              <IonIcon slot="start" icon={add} />
              Acquisti
            </IonButton>
            <IonButton routerLink="/nuovo-pagamento">
              <IonIcon slot="start" icon={add} />
              Pagamento
            </IonButton>
          </ButtonsWrapper>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Movements;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;

  & > ion-button {
    flex: 1;
  }
`;
