// hooks/useAuth.tsx
"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface AuthUser {
  id: number;
  email: string;
  // …otros campos que devuelve tu /users/me
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, recupera token de localStorage y, si existe, carga el usuario
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_user");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Obtiene /users/me y setea user o limpia todo en caso de fallo
  const fetchUser = async (jwt: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        // token inválido o expirado
        setUser(null);
        setToken(null);
        localStorage.removeItem("admin_user");
      }
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("admin_user");
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const body = new URLSearchParams({ username: email, password });
      const res = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) return false;

      const { access_token } = await res.json();
      localStorage.setItem("admin_user", access_token);
      setToken(access_token);
      await fetchUser(access_token);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("admin_user")   // <- importante
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
