import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const iconMap: Record<string, JSX.Element> = {
  lobby_invite: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  post_like: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  new_member: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  message: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

const colorMap: Record<string, string> = {
  lobby_invite: "#7c3aed",
  post_like: "#f472b6",
  new_member: "#4ade80",
  message: "#60a5fa",
};

const quotes = [
  { text: "El equipo que comunica, domina.", author: "SquadUp" },
  { text: "Un solo jugador puede cambiar el juego. Un squad lo gana.", author: "SquadUp" },
  { text: "La victoria no es individual, es colectiva.", author: "SquadUp" },
  { text: "Encuentra tu squad. Domina el lobby.", author: "SquadUp" },
  { text: "Los mejores equipos no nacen, se encuentran.", author: "SquadUp" },
  { text: "Cada partida es una nueva oportunidad de brillar.", author: "SquadUp" },
  { text: "El respeto y la comunicación son las mejores armas.", author: "SquadUp" },
  { text: "Juntos somos más fuertes que cualquier enemigo.", author: "SquadUp" },
];

const initialNotifications = [
  { id: 1, type: "lobby_invite", message: "xSniper99 te invitó a unirte a Ranked Squad", read: false, time: "hace 5 min", actionable: true },
  { id: 2, type: "post_like", message: "ProGamer_Mia le dio like a tu publicación", read: false, time: "hace 20 min", actionable: false },
  { id: 3, type: "new_member", message: "DarkLord_CS se unió a tu lobby", read: false, time: "hace 1h", actionable: false },
  { id: 4, type: "message", message: "Nuevo mensaje en Ranked Squad", read: true, time: "hace 2h", actionable: false },
  { id: 5, type: "lobby_invite", message: "NightOwl_G te invitó a unirte a Weekend Warriors", read: true, time: "hace 3h", actionable: true },
  { id: 6, type: "post_like", message: "BladeRunner_X le dio like a tu publicación", read: true, time: "hace 5h", actionable: false },
  { id: 7, type: "new_member", message: "StellarAim se unió a tu lobby Chill Games", read: true, time: "hace 1d", actionable: false },
];

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
      <rect x="8" y="28" width="10" height="6" fill="#7c3aed" style={{ animation: 'armLeft 0.5s ease-in-out infinite alternate' }} />
      <rect x="42" y="28" width="10" height="6" fill="#7c3aed" style={{ animation: 'armRight 0.5s ease-in-out infinite alternate' }} />
      <rect x="6" y="25" width="6" height="6" fill="#a78bfa" />
      <rect x="48" y="25" width="6" height="6" fill="#a78bfa" />
      <rect x="20" y="47" width="8" height="10" fill="#4c1d95" style={{ animation: 'legBounce 0.5s ease-in-out infinite alternate' }} />
      <rect x="32" y="47" width="8" height="10" fill="#4c1d95" style={{ animation: 'legBounce 0.5s ease-in-out infinite alternate-reverse' }} />
      <rect x="18" y="55" width="12" height="4" fill="#2e1065" />
      <rect x="30" y="55" width="12" height="4" fill="#2e1065" />
      <g style={{ animation: 'floatNotif 1.5s ease-in-out infinite', transformOrigin: '52px 20px' }}>
        <rect x="44" y="12" width="14" height="10" rx="2" fill="#f472b6" />
        <rect x="46" y="14" width="10" height="2" fill="white" />
        <rect x="46" y="17" width="7" height="2" fill="white" />
        <rect x="50" y="22" width="4" height="3" fill="#f472b6" />
      </g>
    </svg>
  </div>
);

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifications(notifications.filter((n) => n.id !== id));

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unread = filtered.filter((n) => !n.read);
  const read = filtered.filter((n) => n.read);

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <div className="relative px-8 py-6 flex-shrink-0 overflow-hidden" style={{ background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 left-0 h-px" style={{ background: 'rgba(124,58,237,0.2)' }} />

          <div className="absolute right-8 bottom-0" style={{ zIndex: 2 }}>
            <PixelCharacter />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#7c3aed', fontFamily: 'Orbitron, sans-serif' }}>Centro de actividad</p>
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
              <button onClick={markAllRead} className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mr-36" style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)', fontFamily: 'Orbitron, sans-serif' }}>
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

        {/* Content */}
        <div className="flex-1 flex">

          {/* Notificaciones */}
          <div className="flex-1 px-8 py-6 max-w-3xl">
            {unread.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Nuevas</p>
                <div className="flex flex-col gap-3">
                  {unread.map((notif, i) => (
                    <div
                      key={notif.id}
                      onClick={() => !notif.actionable && markRead(notif.id)}
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                      style={{
                        background: `${colorMap[notif.type]}0f`,
                        border: `1px solid ${colorMap[notif.type]}33`,
                        animation: `fadeSlideIn 0.4s ease forwards`,
                        animationDelay: `${i * 0.08}s`,
                        opacity: 0,
                        cursor: notif.actionable ? 'default' : 'pointer',
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${colorMap[notif.type]}22`, color: colorMap[notif.type] }}>
                        {iconMap[notif.type]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white mb-0.5">{notif.message}</p>
                        <p className="text-xs" style={{ color: '#6b7280' }}>{notif.time}</p>
                        {notif.actionable && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={(e) => { e.stopPropagation(); markRead(notif.id); navigate("/lobbies/1"); }} className="px-3 py-1 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.4)' }}>
                              Aceptar
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }} className="px-3 py-1 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }}>
                              Rechazar
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colorMap[notif.type], boxShadow: `0 0 8px ${colorMap[notif.type]}` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {read.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Anteriores</p>
                <div className="flex flex-col gap-3">
                  {read.map((notif, i) => (
                    <div
                      key={notif.id}
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        animation: `fadeSlideIn 0.4s ease forwards`,
                        animationDelay: `${(unread.length + i) * 0.08}s`,
                        opacity: 0,
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: '#4b5563' }}>
                        {iconMap[notif.type]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-0.5" style={{ color: '#9ca3af' }}>{notif.message}</p>
                        <p className="text-xs" style={{ color: '#4b5563' }}>{notif.time}</p>
                        {notif.actionable && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => navigate("/lobbies/1")} className="px-3 py-1 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }}>
                              Ver lobby
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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
          </div>

          {/* Panel derecho — frase motivacional */}
{/* Panel derecho — frase motivacional */}
<div className="w-96 flex-shrink-0 flex flex-col items-center justify-center p-6 pl-20 sticky top-0" style={{ borderLeft: '1px solid rgba(124,58,237,0.08)', height: 'calc(100vh - 160px)', alignSelf: 'flex-start' }}>            {/* Comilla apertura */}
            <p className="self-start text-8xl font-black leading-none" style={{ color: 'rgba(124,58,237,0.25)', fontFamily: 'Georgia, serif', lineHeight: '0.7', marginBottom: '-10px' }}>"</p>

            {/* Frase */}
            <p className="text-2xl font-black text-center leading-snug my-4" style={{ color: '#e9d5ff', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em' }}>
              {quote.text}
            </p>

            {/* Comilla cierre */}
            <p className="self-end text-8xl font-black leading-none" style={{ color: 'rgba(124,58,237,0.25)', fontFamily: 'Georgia, serif', lineHeight: '0.7', marginTop: '-10px', marginBottom: '16px' }}>"</p>

            {/* Autor */}
            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1" style={{ background: 'rgba(124,58,237,0.3)' }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7c3aed', fontFamily: 'Orbitron, sans-serif' }}>{quote.author}</p>
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
        @keyframes floatNotif {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes armLeft {
          from { transform: rotate(-20deg); transform-origin: 18px 33px; }
          to { transform: rotate(20deg); transform-origin: 18px 33px; }
        }
        @keyframes armRight {
          from { transform: rotate(20deg); transform-origin: 42px 33px; }
          to { transform: rotate(-20deg); transform-origin: 42px 33px; }
        }
        @keyframes legBounce {
          from { transform: translateY(0); }
          to { transform: translateY(2px); }
        }
      `}</style>
    </MainLayout>
  );
};

export default Notifications;