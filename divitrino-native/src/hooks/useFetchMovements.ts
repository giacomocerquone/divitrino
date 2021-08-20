import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IPayment, IPurchase } from "../interfaces";
import client from "../services/client";

const useFetchMovements = (groupId: string) => {
  const [movs, setMovs] = useState<
    {
      createdAt: string;
      data: (IPurchase & IPayment)[];
    }[]
  >([]);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const { data } = await client.get<{
          purchases?: IPurchase[];
          payments?: IPayment[];
        }>(endpoints.movements, {
          params: {
            groupId,
          },
        });

        const groupedByCreatedAt = [
          ...(data?.purchases || []),
          ...(data?.payments || []),
        ].reduce<Record<string, (IPurchase & IPayment)[]>>(
          (sects, mov: any) => {
            // TODO replace mov: any typing
            if (sects[mov.createdAt]) {
              sects[mov.createdAt].push(mov);
            } else {
              sects[mov.createdAt] = [mov];
            }

            return sects;
          },
          {}
        );

        const sectionedMovs = Object.keys(groupedByCreatedAt).map((date) => ({
          createdAt: date,
          data: groupedByCreatedAt[date],
        }));

        setMovs(sectionedMovs);
      } catch (e) {
        console.log("error fetching movements", e);
      }
    };

    fetchMovements();
  }, [groupId]);

  return movs;
};

export default useFetchMovements;
