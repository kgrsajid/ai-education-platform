// context/AuthContext.tsx
import {useState, type ReactNode } from "react";
import { AuthContext } from "./const/const";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
