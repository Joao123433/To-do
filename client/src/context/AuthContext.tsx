import { createContext, useEffect, useState } from "react";
import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";
import { api } from "../services/api";

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function AuthProvider({children}: ChildrenInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await api.get("check-token", { withCredentials: true });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error("Error checking token:", error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("login", { email, password }, { withCredentials: true });

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
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
    const response = await api.post("register", { email, password, name }, { withCredentials: true });

    if (response.status === 200) {
      setIsAuthenticated(true);
    } else {
      console.error("Register failed");
    }  
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}