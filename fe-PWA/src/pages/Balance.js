import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Title from "components/atoms/Title";
import PageContainer from "components/atoms/PageContainer";

const Balance = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <PageContainer>
          <Title>Bilancio</Title>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Balance;
