import { EUR } from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { unit } from "../../../constants/ui";
import { IUser, TBalance } from "../../../interfaces";
import { getUser } from "../../../store";
import { formatMoney } from "../../../utils";
import Text from "../../atoms/Text";
import Row from "./Row";

export const generateDineroObject = (amount: number) => {
  if (!amount) return "€ 0";
  const dAmount = dinero({ amount, currency: EUR });
  return formatMoney(dAmount);
};

const UserBalance: FunctionComponent<Props> = ({ balance, peopleMap }) => {
  const user = useSelector(getUser);

  if (!balance || !user.id) return null;

  const currentUserCredits = balance[user.id];
  const currentUserDebts = Object.keys(balance).filter(
    (creditorId) =>
      user.id &&
      creditorId !== user.id &&
      balance[creditorId][user.id] &&
      balance[creditorId][user.id] !== 0
  );

  return (
    <View>
      <View style={styles.tableHeader}>
        <Text align="left" weight="light" text="Operazione" size="xs" />
        <Text align="center" text="Utente" weight="light" size="xs" />
        <Text align="right" weight="light" text="Quantità" size="xs" />
      </View>

      {Object.keys(currentUserCredits).map((debtorId) => (
        <Row key={debtorId}>
          <Text text="Ricevi" weight="bold" size="s" />
          <Text text={peopleMap[debtorId].name} />
          <Text
            text={generateDineroObject(currentUserCredits[debtorId])}
            size="s"
          />
        </Row>
      ))}

      {currentUserDebts.map((creditorId) => (
        <Row key={creditorId}>
          <Text text="Devi" weight="bold" size="s" />
          <Text text={peopleMap[creditorId].name} />
          {user.id && (
            <Text
              text={generateDineroObject(balance[creditorId][user.id])}
              size="s"
            />
          )}
        </Row>
      ))}
    </View>
  );
};

export default UserBalance;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: unit * 4,
    marginBottom: unit * 6,
    justifyContent: "space-between",
  },
});

interface Props {
  balance?: TBalance;
  peopleMap: Record<IUser["id"], IUser>;
}
