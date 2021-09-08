import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useCallback, useState, useEffect } from "react";

import * as endpoints from "../constants/endpoints";
import { IPayment, IPurchase } from "../interfaces";
import client from "../services/client";

interface ISectionedMovs {
  dateFmt: string;
  data: (IPurchase & IPayment)[];
}

const useFetchMovements = (groupId: string) => {
  const [movs, setMovs] = useState<ISectionedMovs[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const fetchMovements = useCallback(
    async (size?: number) => {
      try {
        setError(undefined);
        setLoading(true);
        const { data } = await client.get<[]>(endpoints.movements, {
          params: {
            groupId,
            page,
            size: size || 20,
          },
        });

        const groupedByCreatedAt = [...(data || [])].reduce<
          Record<string, (IPurchase & IPayment)[]>
        >((sects, mov: any) => {
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
        }, {});

        const sectionedMovs = Object.keys(groupedByCreatedAt).map((date) => ({
          dateFmt: date,
          data: groupedByCreatedAt[date],
        }));

        setMovs(sectionedMovs);
        setLoading(false);
      } catch (e) {
        console.log("error fetching movements", e);
        setLoading(false);
        setError(e);
      }
    },
    [groupId, page]
  );

  const fetchMovementsOnFocus = useCallback(() => {
    fetchMovements();
  }, [fetchMovements]);

  useFocusEffect(fetchMovementsOnFocus);

  useEffect(() => {
    // only when page is different than 0
    // for the initial fetch we use the focus effect
    if (page) {
      fetchMovements();
    }
  }, [fetchMovements, page]);

  return {
    movs,
    refetch: fetchMovements,
    nextPage: () => setPage((p) => p + 1),
    loading,
    error,
  };
};

export default useFetchMovements;
