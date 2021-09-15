import React, { FunctionComponent, useMemo } from "react";
import { View } from "react-native";
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
          {Object.keys(balance[creditor.id])
            .filter((debtorId) => debtorId !== user.id)
            .map(
              (debtorId) =>
                balance[creditor.id][debtorId] > 0 && (
                  <Row key={creditor.id + debtorId}>
                    <Text text={peopleMap[debtorId].name} />
                    <Text text="Deve" weight="bold" size="s" />
                    <Text text={creditor.name} size="s" />
                    <Text
                      text={generateDineroObject(
                        balance[creditor.id][debtorId]
                      )}
                      size="s"
                    />
                  </Row>
                )
            )}
        </>
      ))}
    </View>
  );
};

export default OthersBalance;

interface Props {
  balance: TBalance;
  peopleMap: Record<IUser["id"], IUser>;
}
