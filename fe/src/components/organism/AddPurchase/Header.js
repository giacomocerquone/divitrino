import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
} from "@ionic/react";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import { checkmarkDoneOutline, personAddOutline } from "ionicons/icons";
import React from "react";

const Header = ({ onMultipleAssignIntent, onSelectAll }) => {
  return (
    <IonHeader mode="ios">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="Indietro" default-href="/" />
        </IonButtons>
        <IonTitle>Aggiungi Spesa</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onSelectAll}>
            <IonIcon icon={checkmarkDoneOutline} />
          </IonButton>
          <IonButton onClick={onMultipleAssignIntent}>
            <IonIcon icon={personAddOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
