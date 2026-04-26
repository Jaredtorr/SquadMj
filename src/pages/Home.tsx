import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroChar from "../assets/heloo.png";
import LobbyCard from "../components/lobby/LobbyCard";
import PostCard from "../components/feed/PostCard";

const posts = [
  { id: 1, username: "xSniper99", time: "Hace 2h", content: "Buscando squad para ranked esta noche 🎮 Necesito un main de soporte, se requiere micrófono.", likes: 24, comments: 5 },
  { id: 2, username: "ProGamer_Mia", time: "Hace 4h", content: "Acabo de llegar a Diamante en Valorant después de 3 meses de grind. SquadUp hizo mucho más fácil encontrar buenos compañeros 💜", likes: 87, comments: 12 },
  { id: 3, username: "DarkLord_CS", time: "Hace 6h", content: "Nuevo lobby abierto para CS2 competitivo. Solo jugadores serios, se requiere micrófono. Comenta si te interesa.", likes: 15, comments: 3 },
  { id: 4, username: "NightOwl_G", time: "Hace 8h", content: "¿Alguien quiere practicar construcciones en Fortnite? Quiero mejorar antes del torneo de la próxima semana 🏆", likes: 31, comments: 8 },
  { id: 5, username: "BladeRunner_X", time: "Hace 10h", content: "Acabo de ganar un clutch 1v4 en CS2. El grind es real 💪 ¿Quién quiere hacer equipo este fin de semana?", likes: 56, comments: 14 },
  { id: 6, username: "StellarAim", time: "Hace 12h", content: "SquadUp es la mejor forma de encontrar compañeros de verdad. Encontré todo mi equipo ranked aquí en un día 🔥", likes: 102, comments: 21 },
];

const lobbies = [
  { id: 1, title: "Ranked Squad", description: "Buscamos jugadores serios. Se requiere micrófono.", game: "Valorant", status: "open" as const, members: 3, max: 5, owner: "xSniper99" },
  { id: 2, title: "Chill Games", description: "Sin presión, solo a divertirse. Todos los rangos bienvenidos.", game: "League of Legends", status: "open" as const, members: 2, max: 5, owner: "ProGamer_Mia" },
  { id: 3, title: "Pro Team", description: "Equipo competitivo. Solo Diamante+. Práctica diaria.", game: "CS2", status: "full" as const, members: 5, max: 5, owner: "DarkLord_CS" },
  { id: 4, title: "Weekend Warriors", description: "Sesiones casuales de fin de semana. La diversión primero.", game: "Fortnite", status: "open" as const, members: 1, max: 4, owner: "NightOwl_G" },
];

const navLinks = [
  { label: "Inicio", path: "/home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Lobbies", path: "/lobbies", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Crear publicación", path: "/post/create", icon: "M12 4v16m8-8H4" },
  { label: "Crear lobby", path: "/lobbies/create", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Notificaciones", path: "/notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { label: "Perfil", path: "/profile/me", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("/home");

  return (
    <div className="min-h-screen text-white flex" style={{ background: 'linear-gradient(135deg, #06040F 0%, #0d0820 50%, #06040F 100%)' }}>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col py-8 px-5 z-40" style={{ background: 'rgba(10,5,25,0.97)', borderRight: '1px solid rgba(124,58,237,0.12)' }}>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 16px rgba(124,58,237,0.5)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#a78bfa' }}>SquadUp</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = active === link.path;
            return (
              <button
                key={link.path}
                onClick={() => { setActive(link.path); navigate(link.path); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={{
                  background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: isActive ? '#c4b5fd' : '#6b7280',
                  border: isActive ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                }}
              >
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={link.icon} />
                </svg>
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(124,58,237,0.12)' }}>
          <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
          <div>
            <p className="text-xs font-semibold text-white">xSniper99</p>
            <p className="text-xs" style={{ color: '#6b7280' }}>En línea</p>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="ml-56 flex-1 flex flex-col">

        {/* Hero Banner */}
        <div className="relative w-full overflow-hidden flex items-center" style={{ minHeight: '260px', background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(124,58,237,0.5) 0px, transparent 1px, transparent 60px, rgba(124,58,237,0.5) 61px)', backgroundSize: '61px 100%' }} />

          <div className="relative z-10 px-10 flex-1">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7c3aed' }}>Bienvenido, xSniper99</p>
            <h1 className="text-4xl font-black leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>
              Encuentra tu<br />
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
                Squad Perfecto.
              </span>
            </h1>
            <p className="text-sm mb-5" style={{ color: '#6b7280' }}>Conéctate con gamers, únete a lobbies, dominen juntos.</p>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/lobbies")} className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}>
                Ver Lobbies
              </button>
              <button onClick={() => navigate("/lobbies/create")} className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all" style={{ border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)' }}>
                + Crear Lobby
              </button>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0 flex items-end justify-center" style={{ width: '280px', height: '260px' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)', filter: 'blur(12px)' }} />
            <img src={heroChar} alt="Personaje" className="relative z-10 object-contain" style={{ height: '250px', width: 'auto', filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.5)) drop-shadow(0 0 60px rgba(124,58,237,0.2))' }} />
          </div>

          <div className="relative z-10 flex flex-col gap-4 px-8 flex-shrink-0" style={{ borderLeft: '1px solid rgba(124,58,237,0.12)' }}>
            {[{ label: "Jugadores activos", value: "12.4K" }, { label: "Lobbies abiertos", value: "348" }, { label: "Juegos", value: "45+" }].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-black" style={{ color: '#a78bfa' }}>{stat.value}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-6 py-6">

          {/* Active Lobbies grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Lobbies Activos</h2>
              <button onClick={() => navigate("/lobbies")} className="text-xs font-semibold" style={{ color: '#7c3aed' }}>Ver todos →</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {lobbies.map((lobby) => (
                <LobbyCard key={lobby.id} lobby={lobby} />
              ))}
            </div>
          </div>

          {/* Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Últimas Publicaciones</h2>
            </div>

            <div onClick={() => navigate("/post/create")} className="rounded-2xl p-4 mb-4 flex items-center gap-3 cursor-pointer transition-all" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.14)' }}>
              <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
              <span className="text-sm flex-1" style={{ color: '#4b5563' }}>Comparte algo con tu squad...</span>
              <span className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(124,58,237,0.25)', color: '#c4b5fd' }}>Publicar</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;