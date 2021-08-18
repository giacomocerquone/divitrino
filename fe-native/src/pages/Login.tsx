import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/atoms/Input";
import Centered from "../templates/Centered";

const Login = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });

  const onSubmit = () => {
    console.log("asd");
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
        value={data.email}
        onChangeText={(text) => setData((d) => ({ ...d, email: text }))}
      />
      <Input
        autoCapitalize="none"
        autoCompleteType="password"
        placeholder="Password"
        value={data.pwd}
        onChangeText={(text) => setData((d) => ({ ...d, pwd: text }))}
      />
    </Centered>
  );
};

export default Login;

const styles = StyleSheet.create({});
