import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IAPIProduct } from "../interfaces";
import client from "../services/client";

const useFetchPurchase = (purchaseId?: string | false) => {
  const [purchase, setPurchase] = useState<{
    description: string;
    products: IAPIProduct[];
  }>();

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const { data } = await client.get(endpoints.purchase, {
          params: { purchaseId },
        });

        setPurchase(data);
      } catch (e) {
        console.log("error fetching purchase", e);
      }
    };

    if (purchaseId) {
      fetchPurchase();
    }
  }, [purchaseId]);

  return purchase;
};

export default useFetchPurchase;
