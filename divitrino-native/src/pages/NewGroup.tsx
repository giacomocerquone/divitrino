import React, { useState } from "react";

import Input from "../components/atoms/Input";
import Centered from "../templates/Centered";

const Invite = () => {
  const [groupName, setGroupName] = useState("");

  const onSubmit = () => {};

  return (
    <Centered
      title="Crea gruppo"
      description={`Crea un gruppo con cui 
poter iniziare a dividere le spese`}
      onPrimary={onSubmit}
      primaryText="Fatto"
    >
      <Input
        autoCompleteType="email"
        placeholder="Nome gruppo"
        value={groupName}
        onChangeText={setGroupName}
      />
    </Centered>
  );
};

export default Invite;
