import { useContext } from "react";
import { UserContext } from "../global-state/Contexts/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("error");
  }
  return context;
};
