import React, { FunctionComponent, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import PageHeader from "../components/organisms/PageHeader";
import { unit } from "../constants/ui";
import useFetchGroupBalance from "../hooks/useFetchGroupBalance";
import { IUser, TBalance } from "../interfaces";
import { getActiveGroupUsers } from "../store";

const UserDebts: FunctionComponent<Props> = ({ user, balance, peopleMap }) => {
  return <View />;
};

const Balance = () => {
  const people = useSelector(getActiveGroupUsers);
  const peopleMap = useMemo<Record<IUser["id"], IUser>>(() => {
    if (!people) return {};
    return people.reduce((map, user) => {
      return { ...map, [user.id]: user };
    }, {});
  }, [people]);
  const balance = useFetchGroupBalance();

  console.log(balance);

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={people}
      ListHeaderComponent={<PageHeader title="Bilancio" />}
      renderItem={({ item }) => (
        <UserDebts user={item} balance={balance} peopleMap={peopleMap} />
      )}
    />
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: { paddingHorizontal: unit * 5 },
});

interface Props {
  user: IUser;
  balance?: TBalance;
  peopleMap: Record<IUser["id"], IUser>;
}
