import { createContext, useState } from "react";
import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";
import { api } from "../services/api";

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function AuthProvider({children}: ChildrenInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (name: string, password: string) => {
    try {
      const response = await api.post("login", { name, password });
      console.log(response)
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}