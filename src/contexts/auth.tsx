import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IAuthContextType {
  isAuthenticated: boolean;
  user: IUser;
  signIn: (data: ISignInData) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "anderweb.token": token } = parseCookies();

    if (token) {
      const { "anderweb.userId": userId } = parseCookies();
      const response = api.get(`users/profile?id=${userId}`);
      const user = response.data;
      setUser(user);
    } else {
      Router.push("/");
    }
  }, []);

  async function signIn({ email, password }: ISignInData) {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    setCookie(undefined, "anderweb.token", token, {
      maxAge: 60 * 60 * 1,
    });
    setCookie(undefined, "anderweb.userId", user["id"], {
      maxAge: 60 * 60 * 1,
    });

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
