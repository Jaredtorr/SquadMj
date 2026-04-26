import { useNavigate } from "react-router-dom";
import heroChar from "../assets/heloo.png";
import LobbyCard from "../components/lobby/LobbyCard";
import PostCard from "../components/feed/PostCard";
import MainLayout from "../components/layout/MainLayout";

const posts = [
  { id: 1, username: "xSniper99", time: "hace 2h", content: "Buscando escuadra para ranked esta noche 🎮 Necesito un support main, micrófono requerido.", likes: 24, comments: 5 },
  { id: 2, username: "ProGamer_Mia", time: "hace 4h", content: "Acabo de llegar a Diamante en Valorant después de 3 meses de grind. SquadUp lo hizo mucho más fácil para encontrar buenos compañeros 💜", likes: 87, comments: 12 },
  { id: 3, username: "DarkLord_CS", time: "hace 6h", content: "Nueva lobby abierta para CS2 competitivo. Solo jugadores serios, micrófono requerido. Deja un comentario si te interesa.", likes: 15, comments: 3 },
  { id: 4, username: "NightOwl_G", time: "hace 8h", content: "¿Alguien se apunta a practicar builds en Fortnite? Quiero mejorar antes del torneo de la próxima semana 🏆", likes: 31, comments: 8 },
  { id: 5, username: "BladeRunner_X", time: "hace 10h", content: "Acabo de ganar un clutch 1v4 en CS2. El esfuerzo vale la pena 💪 ¿Quién quiere hacer equipo este fin de semana?", likes: 56, comments: 14 },
  { id: 6, username: "StellarAim", time: "hace 12h", content: "SquadUp es la mejor forma de encontrar compañeros, en serio. Encontré todo mi equipo ranked aquí en un solo día 🔥", likes: 102, comments: 21 },
];

const lobbies = [
  { id: 1, title: "Escuadra Ranked", description: "Buscamos jugadores serios. Micrófono requerido.", game: "Valorant", status: "open" as const, members: 3, max: 5, owner: "xSniper99" },
  { id: 2, title: "Partidas Relajadas", description: "Sin presión, solo a pasarla bien. Todos los rangos bienvenidos.", game: "League of Legends", status: "open" as const, members: 2, max: 5, owner: "ProGamer_Mia" },
  { id: 3, title: "Equipo Pro", description: "Equipo competitivo. Solo Diamante+. Práctica diaria.", game: "CS2", status: "full" as const, members: 5, max: 5, owner: "DarkLord_CS" },
  { id: 4, title: "Guerreros del Fin de Semana", description: "Sesiones casuales de fin de semana. La diversión primero.", game: "Fortnite", status: "open" as const, members: 1, max: 4, owner: "NightOwl_G" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="relative w-full overflow-hidden flex items-center" style={{ minHeight: '260px', background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(124,58,237,0.5) 0px, transparent 1px, transparent 60px, rgba(124,58,237,0.5) 61px)', backgroundSize: '61px 100%' }} />

        <div className="relative z-10 px-10 flex-1">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7c3aed' }}>Bienvenido de nuevo, xSniper99</p>
          <h1 className="text-4xl font-black leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>
            Encuentra Tu<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
              Escuadra Ideal.
            </span>
          </h1>
          <p className="text-sm mb-5" style={{ color: '#6b7280' }}>Conecta con gamers, únete a lobbies y dominen juntos.</p>
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
          <img src={heroChar} alt="Personaje del juego" className="relative z-10 object-contain" style={{ height: '250px', width: 'auto', filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.5)) drop-shadow(0 0 60px rgba(124,58,237,0.2))' }} />
        </div>

        <div className="relative z-10 flex flex-col gap-4 px-8 flex-shrink-0" style={{ borderLeft: '1px solid rgba(124,58,237,0.12)' }}>
          {[{ label: "Jugadores Activos", value: "12.4K" }, { label: "Lobbies Abiertas", value: "348" }, { label: "Juegos", value: "45+" }].map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-black" style={{ color: '#a78bfa' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Lobbies Activas</h2>
            <button onClick={() => navigate("/lobbies")} className="text-xs font-semibold" style={{ color: '#7c3aed' }}>Ver todas →</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {lobbies.map((lobby) => (
              <LobbyCard key={lobby.id} lobby={lobby} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Últimas Publicaciones</h2>
          </div>
          <div onClick={() => navigate("/post/create")} className="rounded-2xl p-4 mb-4 flex items-center gap-3 cursor-pointer transition-all" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.14)' }}>
            <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
            <span className="text-sm flex-1" style={{ color: '#4b5563' }}>Comparte algo con tu escuadra...</span>
            <span className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(124,58,237,0.25)', color: '#c4b5fd' }}>Publicar</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;