import { fetchWithAuth } from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface NotificationData {
  id: number;
  user_id: number;
  type: string;
  payload: Record<string, unknown> | null;
  is_read: boolean;
  createdAt: string;
}

export const getNotifications = async (): Promise<NotificationData[]> => {
  const res = await fetchWithAuth(`${API_URL}/notifications`);
  if (!res.ok) throw new Error("Error al cargar notificaciones");
  const data = await res.json();
  return data.notifications;
};

export const markAsRead = async (id: number): Promise<void> => {
  await fetchWithAuth(`${API_URL}/notifications/${id}/read`, { method: "PATCH" });
};

export const markAllAsRead = async (): Promise<void> => {
  await fetchWithAuth(`${API_URL}/notifications/read-all`, { method: "PATCH" });
};

export const deleteNotification = async (id: number): Promise<void> => {
  await fetchWithAuth(`${API_URL}/notifications/${id}`, { method: "DELETE" });
};
