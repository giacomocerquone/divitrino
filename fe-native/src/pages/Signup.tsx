import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import Input from "../components/atoms/Input";
import Centered from "../templates/Centered";

const Signup = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: "",
    pwd: "",
    group: "",
  });

  const onSubmit = () => {};

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
      <Input
        autoCapitalize="none"
        placeholder="Nome gruppo o Id gruppo"
        value={data.group}
        onChangeText={(text) => setData((d) => ({ ...d, group: text }))}
      />
    </Centered>
  );
};

export default Signup;
