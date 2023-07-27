import { User, initialState } from "../Contexts/UserContext";

export type UserState = {
  userId: number;
  accessToken: string;
} | null;

export enum UserActionType {
  USER_LOGIN = "user_login",
  USER_LOGOUT = "user_logout",
}

export interface UserAction {
  type: UserActionType;
  payload: User;
}

export const userReducer = (
  state: UserState,
  action: UserAction
): typeof initialState => {
  switch (action.type) {
    case "user_login":
      state = action.payload;
      return state;
    default:
      throw new Error();
  }
};
