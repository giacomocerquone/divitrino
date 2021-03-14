import React, { useState } from "react";
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
import { useMutation } from "graphql-hooks";
import userSlice from "reducers/user";
import { useDispatch } from "react-redux";

const SIGNUP_MUTATION = `mutation Signup($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      id
      username
      email
    }
  }
}`;

const initialFormState = {
  identifier: "",
  password: "",
};

const Signup = () => {
  const [data, setData] = useState(initialFormState);
  const [loginMut, { loading }] = useMutation(SIGNUP_MUTATION);
  const { identifier, password } = data;
  const dispatch = useDispatch();

  const onChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const doLogin = async () => {
    try {
      const res = await loginMut({ variables: { input: data } });
      dispatch(userSlice.actions.login({ token: res.data.login.jwt }));
    } catch (e) {
      console.log(e);
      alert("errore durante il login");
    }
  };

  return (
    <form onSubmit={doLogin}>
      <IonPage>
        <IonHeader>
          <IonToolbar style={{ padding: "0 20px 10px 20px" }}>
            <Title>Registrazione</Title>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <PageContainer>
            <p>
              Puoi memorizzare tutti i tuoi dati nel cloud e accedere a un
              insieme di funzionalità aggiuntive.
            </p>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                name="identifier"
                value={identifier}
                onIonChange={onChange}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                name="password"
                value={password}
                type="password"
                onIonChange={onChange}
              ></IonInput>
            </IonItem>
            <IonButton
              disable={loading}
              color="success"
              mode="ios"
              onClick={doLogin}
            >
              <IonIcon slot="start" icon={logInOutline} />
              Invia
            </IonButton>
            <IonButton
              disable={loading}
              color="primary"
              mode="ios"
              onClick={doLogin}
            >
              <IonIcon slot="start" icon={logInOutline} />
              Registrati
            </IonButton>
          </PageContainer>
        </IonContent>
      </IonPage>
    </form>
  );
};

export default Signup;

const PageContainer = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
