import { createContext, useEffect, useState } from "react";
import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";
import { api } from "../services/api";
import { tailspin } from "ldrs";


tailspin.register('login-sign')

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function AuthProvider({children}: ChildrenInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await api.get("check-token", { withCredentials: true });

        if(response.status === 200) setIsAuthenticated(true);

      } catch (error) {
        console.error("Error checking token:", error);
        setIsAuthenticated(false);
      }

      setLoader(true)
    };

    checkToken()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("login", { email, password }, { withCredentials: true });

      if (response.status === 200) setIsAuthenticated(true);
    } catch (error: unknown) {
      const err = error as errorSchema;
      throw new Error(err.response.data.message);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await api.post("register", { email, password, name }, { withCredentials: true });
    } catch (error: unknown) {
      const err = error as errorSchema;
      throw new Error(err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("logout", { withCredentials: true });

      if (response.status === 200) setIsAuthenticated(false)
    } catch (error: unknown) {
      const err = error as errorSchema;
      throw new Error(err.response.data.message);
    }
  }

  interface errorSchema {
    response: {
      data: {
        message: string
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {!loader ? 
        <section className="w-screen h-screen flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <login-sign color="white" className="col-end-4" size='60'></login-sign>
          </div>
        </section>
      :  
        children
      }
    </AuthContext.Provider>
  );
}