import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import Title from "components/atoms/Title";
import { logInOutline } from "ionicons/icons";

const Login = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0 20px 10px 20px" }}>
          <Title>Login</Title>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageContainer>
          <p>
            Puoi memorizzare tutti i tuoi dati nel cloud e accedere a un insieme
            di funzionalità aggiuntive.
          </p>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value=""></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput value=""></IonInput>
          </IonItem>
          <IonButton color="success" mode="ios" routerLink="/login">
            <IonIcon slot="start" icon={logInOutline} />
            Login
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Login;

const PageContainer = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
