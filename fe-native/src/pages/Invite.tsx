import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Input from "../components/atoms/Input";
import Centered from "../templates/Centered";

const Invite = () => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {};

  return (
    <Centered
      title="Invita"
      description={`Invita un tuo conoscente
a dividere le spese con te
inserendo la sua mail di seguito`}
      onPrimary={onSubmit}
      primaryText="Fatto"
    >
      <Input
        autoCompleteType="email"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
    </Centered>
  );
};

export default Invite;

const styles = StyleSheet.create({});
