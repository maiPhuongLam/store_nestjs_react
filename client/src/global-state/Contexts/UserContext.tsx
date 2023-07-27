import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
  UserAction,
  UserActionType,
  UserState,
  userReducer,
} from "../reducers/userRecucer";

interface UserContextProviderProps {
  children: ReactNode;
}

export const initialState: UserState = null;

export interface User {
  userId: number;
  accessToken: string;
}

interface UserContextDataDefault {
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}

const userContextDataDefault: UserContextDataDefault = {
  userState: null,
  userDispatch: () => {},
};

export const UserContext = createContext<UserContextDataDefault>(
  userContextDataDefault
);

const UserContextProvider: React.FunctionComponent<
  UserContextProviderProps
> = ({ children }) => {
  const [userState, userDispatch] = useReducer<
    (state: UserState, action: UserAction) => UserState
  >(userReducer, initialState as UserState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
