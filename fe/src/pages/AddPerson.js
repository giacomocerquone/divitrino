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
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import PageContainer from "components/atoms/PageContainer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import peopleSlice from "reducers/people";
import { v4 as uuidv4 } from "uuid";

const AddPerson = ({ history }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const save = () => {
    dispatch(peopleSlice.actions.addPerson({ name, id: uuidv4() }));
    history.goBack();
  };

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
        <PageContainer>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Nome</IonLabel>
              <IonInput
                value={name}
                onIonChange={(e) => setName(e.detail.value)}
                placeholder="Mario Rossi"
              ></IonInput>
            </IonItem>
          </IonList>
          <IonButton mode="ios" onClick={save} color="primary" expand="block">
            Salva
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default AddPerson;
