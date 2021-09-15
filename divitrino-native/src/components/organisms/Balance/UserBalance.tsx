import { EUR } from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

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

  const currentUserCredits = user.id ? balance[user.id] : {};
  const currentUserDebts = Object.keys(balance).filter(
    (creditorId) =>
      user.id &&
      creditorId !== user.id &&
      balance[creditorId][user.id] &&
      balance[creditorId][user.id] !== 0
  );

  return (
    <View>
      {Object.keys(currentUserCredits).map((debtorId) => (
        <Row key={debtorId}>
          <Text text="Ricevi" weight="bold" size="s" style={{ flex: 1 }} />
          <Text
            text={peopleMap[debtorId].name}
            style={{ flex: 1 }}
            align="center"
          />
          <Text
            align="right"
            text={generateDineroObject(currentUserCredits[debtorId])}
            size="s"
            style={{ flex: 1 }}
          />
        </Row>
      ))}

      {currentUserDebts.map(
        (creditorId) =>
          user.id &&
          balance[creditorId][user.id] > 0 && (
            <Row key={creditorId}>
              <Text text="Devi" weight="bold" size="s" style={{ flex: 1 }} />
              <Text
                text={peopleMap[creditorId].name}
                style={{ flex: 1 }}
                align="center"
              />

              <Text
                align="right"
                text={generateDineroObject(balance[creditorId][user.id])}
                size="s"
                style={{ flex: 1 }}
              />
            </Row>
          )
      )}
    </View>
  );
};

export default UserBalance;

interface Props {
  balance: TBalance;
  peopleMap: Record<IUser["id"], IUser>;
}
