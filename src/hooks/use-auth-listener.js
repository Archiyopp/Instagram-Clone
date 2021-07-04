import { useState, useEffect } from "react";
import { useFirebaseContext } from "../context/firebase";

export default function useAuthListener() {
  const { firebase } = useFirebaseContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have a user ... therefore we can store the user in local storage
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // no user therefore clear the storage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);
  return { user };
}
