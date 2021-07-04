import { useState, useEffect } from "react";
import { useUserContext } from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    async function getUserObjByUserId() {
      // we need a function that we can call (firebase service), that gets the user data base on the id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
}
