import { ReactNode, createContext, useReducer } from "react";
import { UserAction, UserState, userReducer } from "../reducers/userRecucer";

interface UserContextProviderProps {
  children: ReactNode;
}

export const initialState: UserState = {
  user: null,
};

export interface User {
  id: number;
  userType: string;
}

interface UserContextDataDefault {
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}

const userContextDataDefault: UserContextDataDefault = {
  userState: { user: null },
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
