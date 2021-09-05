import React, { FunctionComponent, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { IUser, TBalance } from "../../../interfaces";
import { getUser } from "../../../store";
import Text from "../../atoms/Text";
import Row from "./Row";
import { generateDineroObject } from "./UserBalance";

const OthersBalance: FunctionComponent<Props> = ({ balance, peopleMap }) => {
  const user = useSelector(getUser);

  const otherUsers = useMemo(() => {
    return Object.values(peopleMap).filter((person) => person.id !== user.id);
  }, [peopleMap, user.id]);

  return (
    <View>
      {otherUsers.map((creditor) => (
        <>
          {Object.keys(balance[creditor.id]).map((debtorId) => (
            <Row key={creditor.id + debtorId}>
              <Text text={peopleMap[debtorId].name} style={{ flex: 1 }} />
              <Text text="Deve" weight="bold" size="s" style={{ flex: 1 }} />
              <Text text={creditor.name} size="s" style={{ flex: 1 }} />
              <Text
                text={generateDineroObject(balance[creditor.id][debtorId])}
                size="s"
                style={{ flex: 0.5 }}
              />
            </Row>
          ))}
        </>
      ))}
    </View>
  );
};

export default OthersBalance;

const styles = StyleSheet.create({});

interface Props {
  balance: TBalance;
  peopleMap: Record<IUser["id"], IUser>;
}
