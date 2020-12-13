import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";

const People = () => {
  const people = useSelector(getPeople);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>Persone</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer>
          <IonButton
            mode="ios"
            routerLink="/nuova-persona"
            color="primary"
            expand="block"
          >
            Aggiungi persona
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default People;
