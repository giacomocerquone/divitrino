import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Share } from "react-native";
import { showMessage } from "react-native-flash-message";

import * as endpoints from "../constants/endpoints";
import { colors } from "../constants/ui";
import { IGroup } from "../interfaces";
import client, { baseURL } from "../services/client";
import Centered from "../templates/Centered";

const forgeInviteLink = (groupId: string, code: string, inviteId: number) =>
  `${baseURL}/open-invite?groupId=${groupId}&code=${code}&inviteId=${inviteId}`;

type RootStackParamList = {
  Invite: { item: IGroup };
};
type Props = NativeStackScreenProps<RootStackParamList, "Invite">;

const Invite = () => {
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

      const inviteLink = forgeInviteLink(item.id, code, inviteId);
      const content = {
        message: `Entra nel mio gruppo ${item.name} e dividiamo insieme le spese con divitrino: ${inviteLink}`,
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

export default Invite;
