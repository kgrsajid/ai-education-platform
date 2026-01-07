// context/AuthContext.tsx
import {useState, type ReactNode } from "react";
import { AuthContext } from "./const/const";
import type { UserResponse } from "../../features/api/auth/type";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, user: UserResponse) => void;
  logout: () => void;
  token: string | null;
  user: UserResponse | null;
  checkById: (userId: string) => boolean;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<UserResponse | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) as UserResponse : null;
  });

  const login = (t: string, user: UserResponse) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(t);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  const checkById = (userId: string) => {
    if (!user) {
      return false;
    }
    return user.id == userId;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token, user, checkById }}>
      {children}
    </AuthContext.Provider>
  );
};
