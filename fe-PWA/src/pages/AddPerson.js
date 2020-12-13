import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import PageContainer from "components/atoms/PageContainer";
import React from "react";

const AddPerson = () => {
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>Aggiungi Persona</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer></PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default AddPerson;
