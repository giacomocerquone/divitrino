import React from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import Title from "components/atoms/Title";
import PageContainer from "components/atoms/PageContainer";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import PayeeReport from "components/organism/PayeeReport";

const Balance = () => {
  const people = useSelector(getPeople);

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageContainer>
          <Title>Bilancio</Title>
          {people.map((p) => (
            <PayeeReport key={p.id} person={p} />
          ))}
          <IonButton
            mode="ios"
            onClick={() => null}
            color="success"
            expand="block"
          >
            Preggia i conti
          </IonButton>
          <IonButton
            mode="ios"
            routerLink="/persone"
            color="primary"
            expand="block"
          >
            Gestisci gruppo
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Balance;
