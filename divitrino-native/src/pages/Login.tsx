import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

import Input from "../components/atoms/Input";
import { login } from "../constants/endpoints";
import client from "../services/client";
import * as userActions from "../store/userSlice";
import Centered from "../templates/Centered";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [{ email, pwd }, setData] = useState({
    email: "",
    pwd: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email || !pwd) {
      return showMessage({
        type: "warning",
        description: "Devi inserire un username e una password",
        message: "Attenzione",
      });
    }
    try {
      setSubmitting(true);
      const {
        data: { accessToken: token, ...user },
      } = await client.post(login, { email, password: pwd });
      setSubmitting(false);
      dispatch(userActions.login({ token, user }));
    } catch (e) {
      setSubmitting(false);
      if (e?.response?.data?.message) {
        showMessage({
          type: "danger",
          description: e?.response?.data?.message,
          message: "Errore",
        });
      }
      console.log("login error", e?.response?.data?.message || e);
    }
  };

  // @ts-ignore
  const goToSignup = () => navigation.navigate("Signup");

  return (
    <Centered
      hideBack
      title="Benvenuto"
      description={`Gestisci le finanze del tuo gruppo
e dividi le spese con loro
fotografando gli scontrini`}
      onPrimary={onSubmit}
      onSecondary={goToSignup}
      primaryText="Accedi"
      secondaryText="Registrati"
      disabled={submitting}
    >
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setData((d) => ({ ...d, email: text }))}
      />
      <Input
        autoCapitalize="none"
        autoCompleteType="password"
        secureTextEntry
        placeholder="Password"
        value={pwd}
        onChangeText={(text) => setData((d) => ({ ...d, pwd: text }))}
      />
    </Centered>
  );
};

export default Login;

const styles = StyleSheet.create({});
