import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import IconButton from "../components/atoms/IconButton";
import Text from "../components/atoms/Text";
import PageHeader from "../components/organisms/PageHeader";
import { colors, unit } from "../constants/ui";
import useFetchGroups from "../hooks/useFetchGroups";
import { IGroup, IUser } from "../interfaces";
import { getActiveGroupId } from "../store";
import * as userActions from "../store/userSlice";

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
  const { navigate } = useNavigation();

  return (
    <TouchableHighlight
      style={styles.group}
      onPress={() => dispatch(userActions.setActiveGroupId(item.id))}
    >
      <View style={styles.groupItemHeader}>
        <Text text={item.name} size="s" />
        <IconButton name="add" onPress={() => navigate("Invite")} />
      </View>
      {activeGroupId === item.id &&
        item.users.map((user) => <User item={user} />)}
    </TouchableHighlight>
  );
};

const Groups = () => {
  const { navigate } = useNavigation();
  const { groups } = useFetchGroups();

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={groups}
      ListHeaderComponent={<PageHeader title="Gruppo" />}
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
    alignItems: "center",
    paddingVertical: unit * 4,
    borderRadius: unit * 2,
    width: "100%",
    backgroundColor: colors.white,
    marginBottom: unit * 3,
  },
  groupItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: unit * 4,
    marginBottom: unit * 3,
  },
  user: {
    alignItems: "center",
    paddingVertical: unit * 4,
    paddingLeft: unit * 4,
    borderRadius: unit * 2,
    marginLeft: unit * 9,
    width: "100%",
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
