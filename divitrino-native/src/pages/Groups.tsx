import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
  Alert,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import IconButton from "../components/atoms/IconButton";
import Text from "../components/atoms/Text";
import PageHeader from "../components/organisms/PageHeader";
import * as endpoints from "../constants/endpoints";
import { colors, unit } from "../constants/ui";
import useFetchGroups from "../hooks/useFetchGroups";
import { IGroup, IUser } from "../interfaces";
import client, { baseURL } from "../services/client";
import { getActiveGroupId } from "../store";
import * as userActions from "../store/userSlice";

const forgeInviteLink = (groupId: string, code: string, inviteId: number) =>
  `${baseURL}/open-invite?groupId=${groupId}&code=${code}&inviteId=${inviteId}`;

const User: FunctionComponent<UserProps> = ({ item }) => {
  return (
    <View style={styles.user}>
      <Text text={item.name} size="xs" />
      <Text text={item.email} size="xs" />
    </View>
  );
};

const Group: FunctionComponent<Props> = ({ item }) => {
  const activeGroupId = useSelector(getActiveGroupId);
  const dispatch = useDispatch();

  const createInvite = async () => {
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

  const askCreateInvite = () => {
    Alert.alert(
      "Vuoi creare un invito?",
      "Ogni invito che crei può essere utilizzato da una sola persona. Vuoi crearlo?",
      [
        {
          text: "Si",
          onPress: createInvite,
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.group}>
      <TouchableOpacity
        style={styles.groupItemHeader}
        onPress={() => dispatch(userActions.setActiveGroupId(item.id))}
      >
        <>
          <Text text={item.name} size="s" />
          <IconButton name="share-social-outline" onPress={askCreateInvite} />
        </>
      </TouchableOpacity>

      {activeGroupId === item.id &&
        item.users.map((user) => <User key={user.id} item={user} />)}
    </View>
  );
};

const Groups = () => {
  const { navigate } = useNavigation();
  const { groups } = useFetchGroups();

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={groups}
      ListHeaderComponent={<PageHeader title="Gruppi" />}
      renderItem={({ item }) => <Group item={item} />}
      ListFooterComponent={
        <Button
          label="Crea"
          onPress={() => navigate("NewGroup")}
          style={styles.createButton}
        />
      }
    />
  );
};

export default Groups;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  group: {
    marginBottom: unit * 3,
  },
  groupItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: unit * 4,
    marginBottom: unit * 3,
    backgroundColor: colors.white,
    width: "100%",
    paddingVertical: unit * 4,
    borderRadius: unit * 2,
  },
  user: {
    paddingVertical: unit * 4,
    paddingLeft: unit * 4,
    borderRadius: unit * 2,
    marginLeft: unit * 9,
    backgroundColor: colors.white,
    marginBottom: unit * 3,
  },
  createButton: {
    alignSelf: "center",
    paddingHorizontal: unit * 8,
    marginTop: unit * 2,
  },
});

interface Props {
  item: IGroup;
}

interface UserProps {
  item: IUser;
}
