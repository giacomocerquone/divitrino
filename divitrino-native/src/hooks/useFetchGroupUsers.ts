import { useEffect, useState } from "react";

import * as endpoints from "../constants/endpoints";
import client from "../services/client";

const useFetchGroupUsers = (groupId: string) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.get(endpoints.users, {
          params: {
            groupId,
          },
        });

        setUsers(data);
      } catch (e) {
        console.log("error fetching users");
      }
    };

    fetchUsers();
  }, [groupId]);

  return users;
};

export default useFetchGroupUsers;
