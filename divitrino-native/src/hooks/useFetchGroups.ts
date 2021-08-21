import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as endpoints from "../constants/endpoints";
import { IGroup } from "../interfaces";
import client from "../services/client";
import { getActiveGroupUsers, getGroups } from "../store";
import * as userActions from "../store/userSlice";

const useFetchGroups = () => {
  const dispatch = useDispatch();
  const activeGroupUsers = useSelector(getActiveGroupUsers);
  const groups = useSelector(getGroups);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await client.get<IGroup[]>(endpoints.groups);

        dispatch(userActions.groupsReceived(data));
      } catch (e) {
        console.log("error fetching users");
      }
    };

    fetchGroups();
  }, [dispatch]);

  return {
    groups,
    activeGroupUsers,
  };
};

export default useFetchGroups;
