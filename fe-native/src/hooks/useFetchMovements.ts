import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IPayment, IPurchase } from "../interfaces";
import client from "../services/client";

const useFetchMovements = (groupId: string) => {
  const [movs, setMovs] = useState<{
    purchases: IPurchase[];
    payments: IPayment[];
  }>({
    purchases: [],
    payments: [],
  });

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const { data } = await client.get(endpoints.movements, {
          params: {
            groupId,
          },
        });

        setMovs(data);
      } catch (e) {
        console.log("error fetching movements", e);
      }
    };

    fetchMovements();
  }, [groupId]);

  return movs;
};

export default useFetchMovements;
