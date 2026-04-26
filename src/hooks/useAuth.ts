import { useState, useEffect } from "react";
import { getUser, getToken, logout } from "../services/authService";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: verificar token con backend (GET /api/auth/me)
    const savedUser = getUser();
    const savedToken = getToken();
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const signIn = (userData: AuthUser, authToken: string) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(authToken);
  };

  const signOut = () => {
    logout();
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, signIn, signOut, isAuthenticated: !!token };
};