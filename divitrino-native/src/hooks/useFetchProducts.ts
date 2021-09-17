import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IAPIProduct } from "../interfaces";
import client from "../services/client";

const useFetchProducts = (movementId?: string | false) => {
  const [products, setProducts] = useState<IAPIProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.get(endpoints.products, {
          params: { movementId },
        });

        setProducts(data);
      } catch (e) {
        console.log("error fetching products", e);
      }
    };

    if (movementId) {
      fetchProducts();
    }
  }, [movementId]);

  return products;
};

export default useFetchProducts;
