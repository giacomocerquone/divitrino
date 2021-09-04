import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Text from "../components/atoms/Text";
import UserBalance from "../components/organisms/Balance/UserBalance";
import EmptyList from "../components/organisms/EmptyList";
import PageHeader from "../components/organisms/PageHeader";
import { unit } from "../constants/ui";
import useFetchGroupBalance from "../hooks/useFetchGroupBalance";
import { IUser } from "../interfaces";
import { getActiveGroupUsers } from "../store";
import { getUser } from "../store/userSlice";

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
          <UserBalance peopleMap={peopleMap} balance={balance} />

          <Text
            size="m"
            weight="normal"
            text="Altro"
            style={styles.otherTitle}
            align="center"
          />
        </>
      )}
    </ScrollView>
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
  otherTitle: {
    marginVertical: unit * 6,
  },
});
