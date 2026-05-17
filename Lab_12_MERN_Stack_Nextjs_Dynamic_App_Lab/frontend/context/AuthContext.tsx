"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, register as apiRegister, getProfile } from "@/lib/api";

interface User { _id: string; name: string; email: string; role: string; token: string; }
interface AuthCtx { user: User | null; loading: boolean; login: (e: string, p: string) => Promise<void>; register: (n: string, e: string, p: string) => Promise<void>; logout: () => void; }

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("rustik_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await apiLogin({ email, password });
    setUser(data);
    localStorage.setItem("rustik_user", JSON.stringify(data));
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await apiRegister({ name, email, password });
    setUser(data);
    localStorage.setItem("rustik_user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rustik_user");
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
