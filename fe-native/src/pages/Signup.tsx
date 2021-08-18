import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import Input from "../components/atoms/Input";
import { signup } from "../constants/endpoints";
import client from "../services/client";
import Centered from "../templates/Centered";

const Signup = () => {
  const navigation = useNavigation();
  const [{ email, pwd, group, name }, setData] = useState({
    email: "",
    pwd: "",
    group: "",
    name: "",
  });

  const onSubmit = async () => {
    try {
      // todo distinguish groupid with groupname
      const res = await client.post(signup, {
        name,
        email,
        pwd,
        groupName: group,
      });
      // dispatch()
    } catch (e) {
      console.log("signup error");
    }
  };

  // @ts-ignore
  const goToLogin = () => navigation.navigate("Login");

  return (
    <Centered
      title="Benvenuto"
      description={`Gestisci le finanze del tuo gruppo
e dividi le spese con loro
scansionando gli scontrini`}
      onPrimary={onSubmit}
      onSecondary={goToLogin}
      primaryText="Registrati"
      secondaryText="Accedi"
    >
      <Input
        autoCompleteType="email"
        placeholder="E-mail"
        value={name}
        onChangeText={(text) => setData((d) => ({ ...d, email: text }))}
      />
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
      <Input
        autoCapitalize="none"
        placeholder="Nome gruppo o Id gruppo"
        value={group}
        onChangeText={(text) => setData((d) => ({ ...d, group: text }))}
      />
    </Centered>
  );
};

export default Signup;
