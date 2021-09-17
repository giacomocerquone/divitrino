import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IAPIProduct } from "../interfaces";
import client from "../services/client";

const useFetchPurchaseProducts = (purchaseId?: string | false) => {
  const [purchase, setPurchase] = useState<IAPIProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.get(endpoints.products, {
          params: { purchaseId },
        });

        setPurchase(data);
      } catch (e) {
        console.log("error fetching purchase", e);
      }
    };

    if (purchaseId) {
      fetchProducts();
    }
  }, [purchaseId]);

  return purchase;
};

export default useFetchPurchaseProducts;
