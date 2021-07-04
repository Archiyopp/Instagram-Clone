import { createContext, useContext } from "react";

export const LoggedInUserContext = createContext(null);

export const useLoggedInUserContext = () => useContext(LoggedInUserContext);
