const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    bio?: string;
    avatar_url?: string;
  };
}

// TODO: conectar con backend
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  // const res = await fetch(`${API_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Credenciales incorrectas");
  // return res.json();
  throw new Error("Backend no conectado");
};

// TODO: conectar con backend
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  // const res = await fetch(`${API_URL}/auth/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Error al registrar");
  // return res.json();
  throw new Error("Backend no conectado");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};