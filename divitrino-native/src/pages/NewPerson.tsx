import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Share } from "react-native";
import { showMessage } from "react-native-flash-message";

import add from "../../assets/add.png";
import * as endpoints from "../constants/endpoints";
import { colors } from "../constants/ui";
import { IGroup } from "../interfaces";
import client, { baseURL } from "../services/client";
import Centered from "../templates/Centered";

const forgeInviteLink = (code: string, inviteId: number) =>
  `${baseURL}/open-invite?&code=${code}&inviteId=${inviteId}`;

type RootStackParamList = {
  Invite: { item: IGroup };
};
type Props = NativeStackScreenProps<RootStackParamList, "Invite">;

const NewPerson = () => {
  const { params } = useRoute<Props["route"]>();
  if (!params?.item) {
    return null;
  }

  const item = params.item;

  const onSubmit = async () => {
    try {
      const {
        data: { code, id: inviteId },
      } = await client.post(endpoints.invite, {
        groupId: item.id,
      });

      const inviteLink = forgeInviteLink(code, inviteId);
      const content = {
        message: `Entra in ${item.name} e dividiamo insieme le spese con Divitrino: ${inviteLink}`,
        url: inviteLink,
      };
      const options = {
        dialogTitle: "Invita",
        tintColor: colors.purple,
      };
      Share.share(content, options);
    } catch (e) {
      showMessage({
        description:
          "Non sono riuscito a generare un link d'invito. Riprova più tardi!",
        message: "Errore",
        type: "danger",
      });
      console.log("error creating invite", e);
    }
  };

  return (
    <Centered
      imgSource={add}
      title="Invita"
      description={`Invita chi vuoi
a dividere le spese con te.
Ogni link che crei può essere
utilizzato da una sola persona.`}
      onPrimary={onSubmit}
      primaryText="Condividi"
    />
  );
};

export default NewPerson;
