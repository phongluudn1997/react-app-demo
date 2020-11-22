import * as React from "react";

import { useAsync } from "../utils/hooks/useAsync";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider!");
  }
  return context;
};

const AuthProvider = (props) => {
  const { data: user } = useAsync();
  return <AuthContext.Provider value={""} {...props} />;
};

export { useAuth, AuthProvider };
