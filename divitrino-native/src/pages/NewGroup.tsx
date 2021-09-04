import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

import group from "../../assets/group.png";
import Input from "../components/atoms/Input";
import * as endpoints from "../constants/endpoints";
import client from "../services/client";
import * as userActions from "../store/userSlice";
import Centered from "../templates/Centered";

const NewGroup = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");

  const onSubmit = async () => {
    try {
      const { data } = await client.post(endpoints.group, {
        groupName,
      });

      dispatch(userActions.setActiveGroupId(data.id));
      goBack();
    } catch (e) {
      showMessage({
        type: "danger",
        description:
          "Ci sono stati problemi nel creare il gruppo. Riprova più tardi",
        message: "Errore",
      });
    }
  };

  return (
    <Centered
      imgSource={group}
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

export default NewGroup;
