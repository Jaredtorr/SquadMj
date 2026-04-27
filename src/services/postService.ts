import { fetchWithAuth } from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface PostData {
  id: number;
  user_id: number;
  user_name?: string;
  user_avatar?: string | null;
  lobby_id: number | null;
  description: string | null;
  image_url?: string | null;
  createdAt: string;
}

export const createPost = async (description: string, lobby_id?: number): Promise<PostData> => {
  const res = await fetchWithAuth(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, lobby_id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear publicación");
  }
  const data = await res.json();
  return data.post;
};

export const addPostImage = async (postId: number, file: File): Promise<void> => {
  const form = new FormData();
  form.append("images", file);
  const res = await fetchWithAuth(`${API_URL}/posts/${postId}/images`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al subir imagen");
  }
};

export const getPostsByUser = async (userId: number): Promise<PostData[]> => {
  const res = await fetchWithAuth(`${API_URL}/posts/user/${userId}`);
  if (!res.ok) throw new Error("Error al cargar posts");
  const data = await res.json();
  return data.posts;
};

export const getAllPosts = async (): Promise<PostData[]> => {
  const res = await fetchWithAuth(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Error al cargar posts");
  const data = await res.json();
  return data.posts;
};

export const deletePost = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar post");
  }
};
