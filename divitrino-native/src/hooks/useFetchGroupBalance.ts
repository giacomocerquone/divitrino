import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import * as endpoints from "../constants/endpoints";
import { TBalance } from "../interfaces";
import client from "../services/client";
import { getActiveGroupId } from "../store";

const useFetchGroupBalance = () => {
  const [balance, setBalance] = useState<TBalance>();
  const groupId = useSelector(getActiveGroupId);

  useFocusEffect(
    useCallback(() => {
      const fetchBalance = async () => {
        try {
          const { data } = await client.get(endpoints.balance, {
            params: { groupId },
          });
          setBalance(data);
        } catch (e) {
          console.log("error fetching balance", e);
        }
      };

      fetchBalance();
    }, [groupId])
  );

  return balance;
};

export default useFetchGroupBalance;
