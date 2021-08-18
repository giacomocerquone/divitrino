import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Input from "../components/atoms/Input";
import { login } from "../constants/endpoints";
import client from "../services/client";
import Centered from "../templates/Centered";

const Login = () => {
  const navigation = useNavigation();
  const [{ email, pwd }, setData] = useState({
    email: "",
    pwd: "",
  });

  const onSubmit = async () => {
    try {
      const res = await client.post(login, { email, pwd });
      // dispatch()
    } catch (e) {
      console.log("login error");
    }
  };

  // @ts-ignore
  const goToSignup = () => navigation.navigate("Signup");

  return (
    <Centered
      title="Benvenuto"
      description={`Gestisci le finanze del tuo gruppo
e dividi le spese con loro
scansionando gli scontrini`}
      onPrimary={onSubmit}
      onSecondary={goToSignup}
      primaryText="Accedi"
      secondaryText="Registrati"
    >
      <Input
        autoCompleteType="email"
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setData((d) => ({ ...d, email: text }))}
      />
      <Input
        autoCapitalize="none"
        autoCompleteType="password"
        placeholder="Password"
        value={pwd}
        onChangeText={(text) => setData((d) => ({ ...d, pwd: text }))}
      />
    </Centered>
  );
};

export default Login;

const styles = StyleSheet.create({});
