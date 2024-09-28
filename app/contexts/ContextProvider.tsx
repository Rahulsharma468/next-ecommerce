import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
  user: boolean | null; // allow null for initial state
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null, // null indicates no user is logged in initially
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean | null>(null); // initial state is null

  const login = () => {
    setUser(true); // login sets user to true
  };

  const logout = () => {
    setUser(false); // logout sets user to false
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
