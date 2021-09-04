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
  ShareJoinLink: { group: IGroup; userName: string };
};
type Props = NativeStackScreenProps<RootStackParamList, "ShareJoinLink">;

const ShareJoinLink = () => {
  const { params } = useRoute<Props["route"]>();
  if (!params.group || !params.userName) {
    return null;
  }

  const group = params.group;
  const userName = params.userName;

  const onSubmit = async () => {
    try {
      const {
        data: { code, id: inviteId },
      } = await client.post(endpoints.invite, {
        groupId: group.id,
      });

      const inviteLink = forgeInviteLink(code, inviteId);
      const content = {
        message: `Entra in ${group.name} e dividiamo insieme le spese con Divitrino: ${inviteLink}`,
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
      title="Condividi Link"
      description={`Usa questo link per invitare ${userName} a far parte del tuo gruppo. Questo link può essere utilizzato una sola volta.`}
      onPrimary={onSubmit}
      primaryText="Condividi"
    />
  );
};

export default ShareJoinLink;
