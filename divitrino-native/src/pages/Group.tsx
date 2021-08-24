import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import PageHeader from "../components/organisms/PageHeader";
import { colors, unit } from "../constants/ui";
import useFetchGroups from "../hooks/useFetchGroups";

const User: FunctionComponent<Props> = ({ item }) => {
  return (
    <View style={styles.user}>
      <View>
        <Text text={item.name} size="xs" />
        <Text text={item.email} size="xs" />
      </View>
    </View>
  );
};

const Group = () => {
  const { navigate } = useNavigation();
  const { activeGroupUsers } = useFetchGroups();

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={activeGroupUsers}
      ListHeaderComponent={<PageHeader title="Gruppo" />}
      renderItem={({ item }) => <User item={item} />}
      ListFooterComponent={
        <Button
          label="invita"
          // @ts-ignore
          onPress={() => navigate("Invite")}
          style={styles.inviteButton}
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
    marginBottom: unit * 4,
  },
  inviteButton: {
    alignSelf: "center",
    paddingHorizontal: unit * 8,
    marginTop: unit * 2,
  },
});

interface Props {
  item: { name: string; email: string };
}