const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

let isRefreshing = false;

export async function fetchWithAuth(input: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(input, { ...init, credentials: "include" });

  if (res.status !== 401) return res;

  // Si ya hay un refresh en curso no lo dupliques
  if (isRefreshing) {
    localStorage.removeItem("user");
    window.location.href = "/login";
    return res;
  }

  isRefreshing = true;
  try {
    const refresh = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      return res;
    }

    // Reintenta la petición original con el nuevo token en cookie
    return fetch(input, { ...init, credentials: "include" });
  } finally {
    isRefreshing = false;
  }
}
