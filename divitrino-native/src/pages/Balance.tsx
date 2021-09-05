import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import OthersBalance from "../components/organisms/Balance/OthersBalance";
import UserBalance from "../components/organisms/Balance/UserBalance";
import EmptyList from "../components/organisms/EmptyList";
import PageHeader from "../components/organisms/PageHeader";
import { unit } from "../constants/ui";
import useFetchGroupBalance from "../hooks/useFetchGroupBalance";
import { IUser } from "../interfaces";
import { getActiveGroupUsers, getUser } from "../store";

const Balance = () => {
  const people = useSelector(getActiveGroupUsers);
  const user = useSelector(getUser);
  const peopleMap = useMemo<Record<IUser["id"], IUser>>(() => {
    if (!people) return {};
    return people.reduce((map, user) => {
      return { ...map, [user.id]: user };
    }, {});
  }, [people]);
  const balance = useFetchGroupBalance();

  return (
    <ScrollView contentContainerStyle={styles.root} stickyHeaderIndices={[0]}>
      <PageHeader title="Bilancio" />
      {!balance || !Object.keys(balance).length || !user.id ? (
        <EmptyList message="Nessun bilancio da mostrare." />
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text align="left" weight="light" text="Operazione" size="xs" />
            <Text align="center" text="Utente" weight="light" size="xs" />
            <Text align="right" weight="light" text="Quantità" size="xs" />
          </View>

          <UserBalance peopleMap={peopleMap} balance={balance} />

          <Text
            size="m"
            weight="normal"
            text="Altro"
            style={styles.otherTitle}
            align="center"
          />

          <OthersBalance peopleMap={peopleMap} balance={balance} />
        </>
      )}
    </ScrollView>
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  otherTitle: {
    marginTop: unit * 3,
    marginBottom: unit * 6,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: unit * 4,
    marginBottom: unit * 6,
    justifyContent: "space-between",
  },
});
