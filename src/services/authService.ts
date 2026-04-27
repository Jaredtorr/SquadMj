import { fetchWithAuth } from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture: string | null;
  };
}

export interface UserData {
  id: number;
  name: string;
  secondname: string | null;
  lastname: string | null;
  email: string;
  profile_picture: string | null;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  user: UserData;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Credenciales incorrectas");
  }
  const data: LoginResponse = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: payload.username, email: payload.email, password: payload.password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al registrar");
  }
  return res.json();
};

export const getProfile = async (): Promise<UserData> => {
  const res = await fetchWithAuth(`${API_URL}/auth/profile`);
  if (!res.ok) throw new Error("No autenticado");
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
};

export const updateProfile = async (id: number, formData: FormData): Promise<UserData> => {
  const res = await fetchWithAuth(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al actualizar perfil");
  }
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
};

export const deleteAccount = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar cuenta");
  }
  localStorage.removeItem("user");
};

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
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

export const getAvatarUrl = (profile_picture: string | null): string | null => {
  if (!profile_picture) return null;
  if (profile_picture.startsWith("http")) return profile_picture;
  return `${BACKEND_URL}/${profile_picture}`;
};
