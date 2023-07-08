import { User, initialState } from "../Contexts/UserContext";

export interface UserState {
  user: User | null;
}

export enum UserActionType {
  USER_LOGIN = "user_login",
  USER_LOGOUT = "user_logout",
}

export interface UserAction {
  type: UserActionType;
  payload: any;
}

export const userReducer = (
  state: UserState,
  action: UserAction
): typeof initialState => {
  switch (action.type) {
    case "user_login":
      return {
        user: action.payload,
      };
    default:
      throw new Error();
  }
};
