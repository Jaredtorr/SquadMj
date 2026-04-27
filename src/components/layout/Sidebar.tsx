import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { getUser, getAvatarUrl, logout } from "../../services/authService";
import type { UserData } from "../../services/authService";
import { fetchWithAuth } from "../../services/api";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const navLinks = [
  { label: "Inicio",            path: "/home",           icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Lobbies",           path: "/lobbies",        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Crear publicación", path: "/post/create",    icon: "M12 4v16m8-8H4" },
  { label: "Crear lobby",       path: "/lobbies/create", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Notificaciones",    path: "/notifications",  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", bell: true },
  { label: "Perfil",            path: "/profile/me",     icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<UserData | null>(getUser());
  const avatarUrl = getAvatarUrl(currentUser?.profile_picture ?? null);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Mostrar siempre el usuario guardado al hacer login
    const stored = getUser();
    if (stored) setCurrentUser(stored);

    // Cargar conteo de no leídas
    fetchWithAuth(`${API_URL}/notifications/unread`)
      .then((r) => r.json())
      .then((data) => {
        const count = Array.isArray(data.notifications) ? data.notifications.length : 0;
        setUnreadCount(count);
      })
      .catch(() => {});

    // Socket para incrementar el badge en tiempo real
    const socket = io(BACKEND_URL, { withCredentials: true });
    socketRef.current = socket;
    socket.on("new_notification", () => setUnreadCount((c) => c + 1));

    return () => { socketRef.current?.disconnect(); };
  }, []);

  // Resetear badge al entrar a notificaciones
  useEffect(() => {
    if (location.pathname === "/notifications") setUnreadCount(0);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside
      className="fixed left-0 top-16 w-60 flex flex-col px-4 py-6"
      style={{ height: 'calc(100vh - 4rem)', background: '#0a0818', borderRight: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Nav links */}
      <div className="flex flex-col gap-1" style={{ flex: 1, overflowY: 'auto' }}>
        {navLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Icono con badge */}
              <div className="relative flex-shrink-0">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                {link.bell && unreadCount > 0 && (
                  <span
                    className="absolute flex items-center justify-center text-white font-black"
                    style={{
                      top: '-5px', right: '-5px',
                      minWidth: '14px', height: '14px',
                      fontSize: '9px', borderRadius: '7px',
                      background: '#ef4444',
                      padding: '0 3px',
                      lineHeight: '14px',
                    }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold w-full transition-all mb-3"
          style={{ color: '#f87171' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>

        {/* Usuario actual */}
        <div className="flex items-center gap-3 px-4 py-2">
          {avatarUrl ? (
            <img src={avatarUrl} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }}
            >
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{currentUser?.name}</p>
            <p className="text-xs" style={{ color: '#4ade80' }}>En línea</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
