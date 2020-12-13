import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import peopleSlice from "reducers/people";

const People = () => {
  const people = useSelector(getPeople);
  const dispatch = useDispatch();

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
          <IonList>
            {people.map((p) => (
              <IonItemSliding key={p.id}>
                <IonItem>
                  <IonLabel>{p.name}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() =>
                      dispatch(peopleSlice.actions.delPerson(p.id))
                    }
                  >
                    elimina
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>

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
