import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import MainLayout from "../components/layout/MainLayout";
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from "../services/notificationService";
import type { NotificationData } from "../services/notificationService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const iconMap: Record<string, JSX.Element> = {
  new_post: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  lobby_join: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  lobby_leave: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  message: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

const colorMap: Record<string, string> = {
  new_post:    "#a78bfa",
  lobby_join:  "#4ade80",
  lobby_leave: "#f87171",
  message:     "#60a5fa",
};

const getLabel = (notif: NotificationData): string => {
  const p = notif.payload ?? {};
  switch (notif.type) {
    case "lobby_join":  return `Alguien se unió a tu lobby "${p.lobby_name ?? ""}"`;
    case "lobby_leave": return `Alguien salió de tu lobby "${p.lobby_name ?? ""}"`;
    case "new_post":    return `Nueva publicación en el lobby #${p.lobby_id ?? ""}`;
    default:            return notif.type;
  }
};

const quotes = [
  { text: "El equipo que comunica, domina.", author: "SquadUp" },
  { text: "Un solo jugador puede cambiar el juego. Un squad lo gana.", author: "SquadUp" },
  { text: "La victoria no es individual, es colectiva.", author: "SquadUp" },
  { text: "Encuentra tu squad. Domina el lobby.", author: "SquadUp" },
  { text: "Los mejores equipos no nacen, se encuentran.", author: "SquadUp" },
];

const formatTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)}d`;
};

const PixelCharacter = () => (
  <div className="relative" style={{ width: '120px', height: '120px' }}>
    <div className="absolute" style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)', animation: 'exclaim 1s ease-in-out infinite' }}>
      <svg width="24" height="32" viewBox="0 0 12 16" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="0" width="4" height="8" fill="#fcd34d" />
        <rect x="4" y="10" width="4" height="4" fill="#fcd34d" />
      </svg>
    </div>
    <svg width="120" height="120" viewBox="0 0 60 60" style={{ imageRendering: 'pixelated', position: 'absolute', bottom: 0 }}>
      <rect x="20" y="15" width="20" height="18" fill="#a78bfa" />
      <rect x="24" y="20" width="3" height="3" fill="#0d0820" />
      <rect x="33" y="20" width="3" height="3" fill="#0d0820" />
      <rect x="27" y="26" width="6" height="4" fill="#0d0820" />
      <rect x="28" y="27" width="4" height="2" fill="#f472b6" />
      <rect x="18" y="33" width="24" height="14" fill="#7c3aed" />
      <rect x="22" y="35" width="16" height="10" fill="#6d28d9" />
      <rect x="8" y="28" width="10" height="6" fill="#7c3aed" />
      <rect x="42" y="28" width="10" height="6" fill="#7c3aed" />
      <rect x="6" y="25" width="6" height="6" fill="#a78bfa" />
      <rect x="48" y="25" width="6" height="6" fill="#a78bfa" />
      <rect x="20" y="47" width="8" height="10" fill="#4c1d95" />
      <rect x="32" y="47" width="8" height="10" fill="#4c1d95" />
      <rect x="18" y="55" width="12" height="4" fill="#2e1065" />
      <rect x="30" y="55" width="12" height="4" fill="#2e1065" />
    </svg>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    getNotifications()
      .then(setNotifications)
      .catch(() => {})
      .finally(() => setLoading(false));

    // Socket para notificaciones en tiempo real
    fetch(`${API_URL}/auth/refresh`, { method: "POST", credentials: "include" }).finally(() => {
      const socket = io(BACKEND_URL, { withCredentials: true });
      socketRef.current = socket;
      socket.on("new_notification", (notif: NotificationData) => {
        setNotifications((prev) => [notif, ...prev]);
      });
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  const handleMarkRead = async (id: number) => {
    await markAsRead(id).catch(() => {});
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead().catch(() => {});
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const handleDismiss = async (id: number) => {
    await deleteNotification(id).catch(() => {});
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = filter === "unread" ? notifications.filter((n) => !n.is_read) : notifications;
  const unread = filtered.filter((n) => !n.is_read);
  const read = filtered.filter((n) => n.is_read);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const NotifRow = ({ notif, isNew, index }: { notif: NotificationData; isNew: boolean; index: number }) => {
    const color = colorMap[notif.type] ?? "#6b7280";
    const icon = iconMap[notif.type] ?? iconMap.message;
    const label = getLabel(notif);

    return (
      <div
        onClick={() => isNew && handleMarkRead(notif.id)}
        className="flex items-center gap-4 p-4 rounded-2xl transition-all"
        style={{
          background: isNew ? `${color}0f` : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isNew ? `${color}33` : 'rgba(255,255,255,0.05)'}`,
          animation: `fadeSlideIn 0.4s ease forwards`,
          animationDelay: `${index * 0.06}s`,
          opacity: 0,
          cursor: isNew ? 'pointer' : 'default',
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: isNew ? `${color}22` : 'rgba(255,255,255,0.05)', color: isNew ? color : '#4b5563' }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-0.5 truncate" style={{ color: isNew ? '#fff' : '#9ca3af' }}>{label}</p>
          <p className="text-xs" style={{ color: isNew ? '#6b7280' : '#4b5563' }}>{formatTime(notif.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isNew && <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />}
          <button
            onClick={(e) => { e.stopPropagation(); handleDismiss(notif.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ color: '#4b5563' }}
            title="Eliminar"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <div className="relative px-8 py-6 flex-shrink-0 overflow-hidden" style={{ background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
          <div className="absolute right-8 bottom-0" style={{ zIndex: 2 }}>
            <PixelCharacter />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#7c3aed' }}>Centro de actividad</p>
              <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
                  Notificaciones
                </span>
                {unreadCount > 0 && (
                  <span className="text-sm px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
                    {unreadCount}
                  </span>
                )}
              </h1>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mr-36"
                style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)' }}
              >
                Marcar todo como leído
              </button>
            )}
          </div>
          <div className="relative z-10 flex gap-2 mt-4">
            {[{ label: "Todas", value: "all" }, { label: "No leídas", value: "unread" }].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as "all" | "unread")}
                className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                style={{
                  background: filter === f.value ? 'rgba(124,58,237,0.25)' : 'transparent',
                  color: filter === f.value ? '#c4b5fd' : '#6b7280',
                  border: filter === f.value ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Lista */}
          <div className="flex-1 px-8 py-6 max-w-3xl">
            {loading ? (
              <p className="text-xs" style={{ color: '#4b5563' }}>Cargando...</p>
            ) : (
              <>
                {unread.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Nuevas</p>
                    <div className="flex flex-col gap-3">
                      {unread.map((n, i) => <NotifRow key={n.id} notif={n} isNew={true} index={i} />)}
                    </div>
                  </div>
                )}
                {read.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Anteriores</p>
                    <div className="flex flex-col gap-3">
                      {read.map((n, i) => <NotifRow key={n.id} notif={n} isNew={false} index={unread.length + i} />)}
                    </div>
                  </div>
                )}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#7c3aed' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold" style={{ color: '#4b5563' }}>No hay notificaciones</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Panel frase */}
          <div className="w-96 flex-shrink-0 flex flex-col items-center justify-center p-6 pl-20 sticky top-0" style={{ borderLeft: '1px solid rgba(124,58,237,0.08)', height: 'calc(100vh - 160px)', alignSelf: 'flex-start' }}>
            <p className="self-start text-8xl font-black leading-none" style={{ color: 'rgba(124,58,237,0.25)', fontFamily: 'Georgia, serif', lineHeight: '0.7', marginBottom: '-10px' }}>"</p>
            <p className="text-2xl font-black text-center leading-snug my-4" style={{ color: '#e9d5ff' }}>{quote.text}</p>
            <p className="self-end text-8xl font-black leading-none" style={{ color: 'rgba(124,58,237,0.25)', fontFamily: 'Georgia, serif', lineHeight: '0.7', marginTop: '-10px', marginBottom: '16px' }}>"</p>
            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1" style={{ background: 'rgba(124,58,237,0.3)' }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7c3aed' }}>{quote.author}</p>
              <div className="h-px flex-1" style={{ background: 'rgba(124,58,237,0.3)' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes exclaim {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(-8px); opacity: 0.7; }
        }
      `}</style>
    </MainLayout>
  );
};

export default Notifications;
