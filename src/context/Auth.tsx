import React from "react";
import jwtDecode from "jwt-decode";
import router from "next/router";
import ROUTES from "@constants/routes";
import cookies from "js-cookie";
import { User } from "@typeDefs/user";

const initialState = {
  user: null,
};
if (process.browser) {
  if (cookies.get("jwtToken")) {
    const decodedToken: any = jwtDecode(cookies.get("jwtToken") || "");

    if (decodedToken.exp * 1000 < Date.now()) {
      cookies.remove("jwtToken");
    } else {
      initialState.user = decodedToken;
    }
  }
}

const AuthContext: React.Context<{
  user?: User | undefined;
  login: (_userData: any) => undefined;
  logout: () => undefined;
}> = React.createContext({
  login: (_userData: any) => undefined,
  logout: () => undefined,
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const login = (userData: any) => {
    if (process.browser) cookies.set("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = async () => {
    console.log("logout");
    await router.push(ROUTES.HOME);
    if (process.browser) cookies.remove("jwtToken");
    console.log("logout", process.browser);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
