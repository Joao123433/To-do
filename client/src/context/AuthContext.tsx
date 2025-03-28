import { createContext, useState } from "react";
import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function AuthProvider({children}: ChildrenInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}