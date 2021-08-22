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
      createdAtFmt: string;
      data: (IPurchase & IPayment)[];
    }[]
  >([]);

  useFocusEffect(
    useCallback(() => {
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
              const createdAtFmt = format(new Date(mov.createdAt), "dd MMMM", {
                locale: it,
              });
              if (sects[createdAtFmt]) {
                sects[createdAtFmt].push(mov);
              } else {
                sects[createdAtFmt] = [mov];
              }

              return sects;
            },
            {}
          );

          const sectionedMovs = Object.keys(groupedByCreatedAt).map((date) => ({
            createdAtFmt: date,
            data: groupedByCreatedAt[date],
          }));

          setMovs(sectionedMovs);
        } catch (e) {
          console.log("error fetching movements", e);
        }
      };

      fetchMovements();
    }, [groupId])
  );

  return movs;
};

export default useFetchMovements;
