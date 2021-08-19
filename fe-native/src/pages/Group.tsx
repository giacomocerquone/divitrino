import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import { colors, unit } from "../constants/ui";
import useFetchGroupUsers from "../hooks/useFetchGroupUsers";
import { getGroupId } from "../store";

const User: FunctionComponent<Props> = ({ item }) => {
  return (
    <View style={styles.user}>
      <Text text={item.name} size="xs" />
      <Text text={item.email} size="xxs" />
    </View>
  );
};

const Group = () => {
  const { navigate } = useNavigation();
  const groupId = useSelector(getGroupId);
  const users = useFetchGroupUsers(groupId);

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={users}
      ListHeaderComponent={
        <Text
          size="xl"
          weight="normal"
          text="Gruppo"
          style={{ marginVertical: unit * 6 }}
        />
      }
      renderItem={({ item }) => <User item={item} />}
      ListFooterComponent={
        <Button
          label="invita"
          // @ts-ignore
          onPress={() => navigate("Invite")}
          style={{ alignSelf: "center", paddingHorizontal: unit * 8 }}
        />
      }
    />
  );
};

export default Group;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  user: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: unit * 4,
    paddingLeft: unit * 4,
    borderRadius: unit * 2,
    width: "100%",
    backgroundColor: colors.white,
  },
});

interface Props {
  item: { name: string; email: string };
}
