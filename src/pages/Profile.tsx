import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/feed/PostCard";

const mockUser = {
  id: 1,
  username: "xSniper99",
  email: "sniper@squadup.gg",
  bio: "Competitive gamer. Valorant Diamond. Always looking for a good squad 💜",
  avatar_url: "",
  created_at: "2024-01-01",
  game: "Valorant",
  rank: "Diamond",
};

const mockPosts = [
  { id: 1, username: "xSniper99", time: "2h ago", content: "Looking for a squad for ranked tonight 🎮 Need a support main, mic required.", likes: 24, comments: 5 },
  { id: 2, username: "xSniper99", time: "1d ago", content: "Just hit Diamond in Valorant after 3 months of grind 💜", likes: 87, comments: 12 },
  { id: 3, username: "xSniper99", time: "3d ago", content: "New lobby open for CS2 competitive. Serious players only, mic required.", likes: 15, comments: 3 },
];

const stats = [
  { label: "Publicaciones", value: "12", color: "#a78bfa" },
  { label: "Lobbies", value: "5", color: "#60a5fa" },
  { label: "Amigos", value: "38", color: "#f472b6" },
];

const ShooterCanvas = ({ color, delay = 0 }: { color: string; delay?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
    {/* Piso */}
    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `${color}40` }} />

    {/* Muñeco corriendo izquierda → derecha */}
    <div className="absolute" style={{ bottom: '1px', animation: `runRight 4s linear infinite`, animationDelay: `${delay}s` }}>
      <svg width="24" height="36" viewBox="0 0 12 18" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="0" width="4" height="4" fill={color} />
        <rect x="3" y="4" width="6" height="5" fill={color} />
        <rect x="9" y="5" width="3" height="2" fill="#9ca3af" />
        <rect x="3" y="9" width="2" height="4" fill={color} style={{ animation: 'legRunL 0.2s steps(2) infinite' }} />
        <rect x="7" y="9" width="2" height="4" fill={color} style={{ animation: 'legRunR 0.2s steps(2) infinite' }} />
        <rect x="5" y="1" width="1" height="1" fill="#0d0820" />
        <rect x="7" y="1" width="1" height="1" fill="#0d0820" />
      </svg>
    </div>

    {/* Bala izquierda → derecha */}
    <div className="absolute" style={{ bottom: '8px', animation: `bulletRight 0.8s linear infinite`, animationDelay: `${delay + 0.5}s` }}>
      <svg width="10" height="6" viewBox="0 0 5 3" style={{ imageRendering: 'pixelated' }}>
        <rect x="0" y="1" width="3" height="1" fill={color} />
        <rect x="3" y="0" width="2" height="3" fill={color} />
      </svg>
    </div>

    {/* Muñeco corriendo derecha → izquierda */}
    <div className="absolute" style={{ bottom: '1px', animation: `runLeft 5s linear infinite`, animationDelay: `${delay + 1}s` }}>
      <svg width="24" height="36" viewBox="0 0 12 18" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
        <rect x="4" y="0" width="4" height="4" fill={color} />
        <rect x="3" y="4" width="6" height="5" fill={color} />
        <rect x="9" y="5" width="3" height="2" fill="#9ca3af" />
        <rect x="3" y="9" width="2" height="4" fill={color} style={{ animation: 'legRunL 0.2s steps(2) infinite' }} />
        <rect x="7" y="9" width="2" height="4" fill={color} style={{ animation: 'legRunR 0.2s steps(2) infinite' }} />
        <rect x="5" y="1" width="1" height="1" fill="#0d0820" />
        <rect x="7" y="1" width="1" height="1" fill="#0d0820" />
      </svg>
    </div>

    {/* Bala derecha → izquierda */}
    <div className="absolute" style={{ bottom: '8px', animation: `bulletLeft 1s linear infinite`, animationDelay: `${delay + 2}s` }}>
      <svg width="10" height="6" viewBox="0 0 5 3" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
        <rect x="0" y="1" width="3" height="1" fill={color} />
        <rect x="3" y="0" width="2" height="3" fill={color} />
      </svg>
    </div>

    {/* Muñeco saltando centro */}
    <div className="absolute" style={{ bottom: '1px', left: '42%', animation: `jump 2s ease-in-out infinite`, animationDelay: `${delay + 0.8}s` }}>
      <svg width="24" height="36" viewBox="0 0 12 18" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="0" width="4" height="4" fill={color} />
        <rect x="3" y="4" width="6" height="5" fill={color} />
        <rect x="3" y="9" width="2" height="4" fill={color} />
        <rect x="7" y="9" width="2" height="4" fill={color} />
        <rect x="5" y="1" width="1" height="1" fill="#0d0820" />
        <rect x="7" y="1" width="1" height="1" fill="#0d0820" />
      </svg>
    </div>

    {/* Explosión en centro cuando balas se cruzan */}
    <div className="absolute" style={{ bottom: '4px', left: '50%', animation: `explode 2s ease-in-out infinite`, animationDelay: `${delay + 1.5}s` }}>
      <svg width="24" height="24" viewBox="0 0 12 12" style={{ imageRendering: 'pixelated' }}>
        <rect x="5" y="0" width="2" height="3" fill="#fcd34d" />
        <rect x="5" y="9" width="2" height="3" fill="#fcd34d" />
        <rect x="0" y="5" width="3" height="2" fill="#fcd34d" />
        <rect x="9" y="5" width="3" height="2" fill="#fcd34d" />
        <rect x="4" y="4" width="4" height="4" fill="#ff4655" />
        <rect x="5" y="3" width="2" height="6" fill="#ff4655" />
        <rect x="3" y="5" width="6" height="2" fill="#ff4655" />
        <rect x="5" y="5" width="2" height="2" fill="#fcd34d" />
      </svg>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header banner */}
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)', minHeight: '200px' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(124,58,237,1) 0px, transparent 1px, transparent 60px)', backgroundSize: '61px 100%' }} />

          <div className="relative z-10 px-10 py-8 flex items-end gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 30px rgba(124,58,237,0.6), 0 0 60px rgba(124,58,237,0.2)' }} />
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full" style={{ background: '#4ade80', border: '2px solid #0d0820', boxShadow: '0 0 8px #4ade80' }} />
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-white">{mockUser.username}</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                  {mockUser.rank}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,70,85,0.15)', color: '#ff4655', border: '1px solid rgba(255,70,85,0.3)' }}>
                  {mockUser.game}
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: '#9ca3af' }}>{mockUser.bio}</p>
              <p className="text-xs" style={{ color: '#4b5563' }}>Se unió el {new Date(mockUser.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <button
              onClick={() => navigate("/profile/edit")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all flex-shrink-0 mb-2"
              style={{ border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)', fontFamily: 'Orbitron, sans-serif' }}
            >
              Editar perfil
            </button>
          </div>
        </div>

        {/* Stats con muñequitos */}
        <div className="px-10 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex gap-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex-1 rounded-2xl text-center transition-all cursor-pointer relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}22`, height: '120px' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = `${stat.color}0f`;
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${stat.color}44`;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${stat.color}22`;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div className="relative z-10 pt-5">
                  <p className="text-3xl font-black mb-1" style={{ color: stat.color, fontFamily: 'Orbitron, sans-serif', textShadow: `0 0 20px ${stat.color}` }}>{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>{stat.label}</p>
                </div>
                <ShooterCanvas color={stat.color} delay={idx * 0.8} />
              </div>
            ))}
          </div>
        </div>

        {/* Posts + panel derecho */}
        <div className="flex-1 flex">
          <div className="flex-1 px-10 py-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Publicaciones</p>
            <div className="flex flex-col gap-3">
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="w-72 flex-shrink-0 py-6 px-6 flex flex-col gap-6" style={{ borderLeft: '1px solid rgba(124,58,237,0.08)' }}>

            {/* Juegos */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Juegos</p>
              <div className="flex flex-col gap-2">
                {[
                  { game: "Valorant", rank: "Diamond", color: "#ff4655" },
                  { game: "CS2", rank: "Gold Nova", color: "#f5a623" },
                  { game: "League of Legends", rank: "Platinum", color: "#00bcd4" },
                ].map((g) => (
                  <div key={g.game} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: g.color, boxShadow: `0 0 6px ${g.color}` }} />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">{g.game}</p>
                      <p className="text-xs" style={{ color: '#6b7280' }}>{g.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lobbies recientes — horizontal */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Lobbies recientes</p>
              <div className="flex gap-2">
                {[
                  { title: "Ranked Squad", game: "Valorant", status: "open" },
                  { title: "Chill Games", game: "LoL", status: "full" },
                ].map((lobby) => (
                  <div
                    key={lobby.title}
                    onClick={() => navigate("/lobbies")}
                    className="flex-1 p-3 rounded-xl cursor-pointer transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(124,58,237,0.3)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <p className="text-xs font-bold text-white truncate mb-1">{lobby.title}</p>
                    <p className="text-xs mb-1.5" style={{ color: '#6b7280' }}>{lobby.game}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: lobby.status === "open" ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: lobby.status === "open" ? '#4ade80' : '#f87171' }}>
                      {lobby.status === "open" ? "Abierto" : "Lleno"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes runRight { from { left: -30px; } to { left: 100%; } }
        @keyframes runLeft { from { right: -30px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes bulletRight { from { left: -15px; } to { left: 100%; } }
        @keyframes bulletLeft { from { right: -15px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        @keyframes explode { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes legRunL { 0% { transform: translateY(0); } 100% { transform: translateY(3px); } }
        @keyframes legRunR { 0% { transform: translateY(3px); } 100% { transform: translateY(0); } }
      `}</style>
    </MainLayout>
  );
};

export default Profile;