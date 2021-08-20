import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../components/atoms/Input";
import { signup } from "../constants/endpoints";
import client from "../services/client";
import * as userActions from "../store/userSlice";
import Centered from "../templates/Centered";

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [{ email, pwd, group, name }, setData] = useState({
    email: "",
    pwd: "",
    group: "",
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    try {
      // todo distinguish groupid with groupname
      setSubmitting(true);
      const {
        data: { accessToken: token, user },
      } = await client.post(signup, {
        name,
        email,
        pwd,
        groupName: group,
      });

      dispatch(userActions.login({ token, user }));
    } catch (e) {
      console.log("signup error");
    } finally {
      setSubmitting(false);
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
      disabled={submitting}
    >
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setData((d) => ({ ...d, name: text }))}
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
        secureTextEntry
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
