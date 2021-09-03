import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useCallback, useState } from "react";

import * as endpoints from "../constants/endpoints";
import { IPayment, IPurchase } from "../interfaces";
import client from "../services/client";

const useFetchMovements = (groupId: string) => {
  const [movs, setMovs] = useState<
    {
      dateFmt: string;
      data: (IPurchase & IPayment)[];
    }[]
  >([]);

  const fetchMovements = useCallback(() => {
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
            const dateFmt = format(new Date(mov.date), "dd MMMM", {
              locale: it,
            });
            if (sects[dateFmt]) {
              sects[dateFmt].push(mov);
            } else {
              sects[dateFmt] = [mov];
            }

            return sects;
          },
          {}
        );

        const sectionedMovs = Object.keys(groupedByCreatedAt).map((date) => ({
          dateFmt: date,
          data: groupedByCreatedAt[date],
        }));

        setMovs(sectionedMovs);
      } catch (e) {
        console.log("error fetching movements", e);
      }
    };
    fetchMovements();
  }, [groupId]);

  useFocusEffect(fetchMovements);

  return { movs, refetch: fetchMovements };
};

export default useFetchMovements;
