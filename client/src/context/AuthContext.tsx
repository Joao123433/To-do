import { createContext, useState } from "react";
import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";
import { api } from "../services/api";

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function AuthProvider({children}: ChildrenInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const response = await api.get("check-token", { withCredentials: true });

      if(response.status === 200) setIsAuthenticated(true);

    } catch (error) {
      console.error("Error checking token:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("login", { email, password }, { withCredentials: true });

      if (response.status === 200) setIsAuthenticated(true);
    } catch (error) {
      throw new Error();
    }
  };

  const logout = async () => { 
    const response = await api.post("logout", { withCredentials: true });

    if (response.status === 200) {
      setIsAuthenticated(false);
    } else {
      console.error("Logout failed");
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      await api.post("register", { email, password, name }, { withCredentials: true });
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
}