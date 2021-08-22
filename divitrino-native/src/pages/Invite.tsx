import React, { useState } from "react";

import Input from "../components/atoms/Input";
import Centered from "../templates/Centered";

const Invite = () => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {};

  return (
    <Centered
      title="Invita"
      description={`Invita chi vuoi
a dividere le spese con te
inserendo una mail`}
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
