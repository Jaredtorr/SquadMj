import { fetchWithAuth } from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export interface LobbyData {
  id: number;
  name: string;
  description: string | null;
  game: string;
  max_members: number;
  members_count: number;
  image: string | null;
  owner_id: number;
  owner_name: string;
  createdAt: string;
}

export interface LobbyMemberData {
  id: number;
  lobby_id: number;
  user_id: number;
  user_name: string;
  joinedAt: string;
}

export const getLobbyImageUrl = (image: string | null): string | null => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${BACKEND_URL}/${image}`;
};

export const getLobbyStatus = (lobby: LobbyData): "open" | "full" =>
  lobby.members_count >= lobby.max_members ? "full" : "open";

export const getAllLobbies = async (): Promise<LobbyData[]> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys`);
  if (!res.ok) throw new Error("Error al cargar lobbies");
  const data = await res.json();
  return data.lobbys;
};

export const getLobbyById = async (id: number): Promise<LobbyData> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys/${id}`);
  if (!res.ok) throw new Error("Lobby no encontrado");
  const data = await res.json();
  return data.lobby;
};

export const createLobby = async (payload: {
  name: string;
  description: string;
  game: string;
  max_members: number;
  image?: File;
}): Promise<LobbyData> => {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("description", payload.description);
  form.append("game", payload.game);
  form.append("max_members", String(payload.max_members));
  if (payload.image) form.append("image", payload.image);

  const res = await fetchWithAuth(`${API_URL}/lobbys`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear lobby");
  }
  const data = await res.json();
  return data.lobby;
};

export const deleteLobby = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar lobby");
  }
};

export const getLobbyMembers = async (id: number): Promise<LobbyMemberData[]> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys/${id}/members`);
  if (!res.ok) throw new Error("Error al cargar miembros");
  const data = await res.json();
  return data.members;
};

export const joinLobby = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys/${id}/join`, { method: "POST" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al unirse al lobby");
  }
};

export const leaveLobby = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/lobbys/${id}/leave`, { method: "POST" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al salir del lobby");
  }
};
