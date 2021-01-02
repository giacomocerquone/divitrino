import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import Title from "components/atoms/Title";
import PageContainer from "components/atoms/PageContainer";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import PayeeReport from "components/organism/PayeeReport";
import AppVersionString from "components/atoms/AppVersionString";

const Balance = () => {
  const people = useSelector(getPeople);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0 20px 10px 20px" }}>
          <Title>Bilancio</Title>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer>
          <div style={{ flexGrow: 1 }}>
            {people.map((p) => (
              <PayeeReport key={p.id} person={p} />
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
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
            <AppVersionString />
          </div>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Balance;
