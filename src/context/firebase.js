import React from "react";

export const FirebaseContext = React.createContext(null);

export const useFirebaseContext = () => React.useContext(FirebaseContext);
