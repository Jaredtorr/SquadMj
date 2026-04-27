import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroChar from "../assets/heloo.png";
import LobbyCard from "../components/lobby/LobbyCard";
import PostCard from "../components/feed/PostCard";
import MainLayout from "../components/layout/MainLayout";
import { getUser } from "../services/authService";
import { getAllLobbies } from "../services/lobbyService";
import { getAllPosts } from "../services/postService";
import type { LobbyData } from "../services/lobbyService";
import type { PostData } from "../services/postService";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = getUser();

  const [lobbies, setLobbies] = useState<LobbyData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    getAllLobbies().then(setLobbies).catch(() => {});
    getAllPosts().then(setPosts).catch(() => {});
  }, []);

  const openLobbies = lobbies.filter(l => l.members_count < l.max_members);

  return (
    <MainLayout>
      {/* Hero */}
      <div className="relative w-full overflow-hidden flex items-center" style={{ minHeight: '260px', background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(124,58,237,0.5) 0px, transparent 1px, transparent 60px, rgba(124,58,237,0.5) 61px)', backgroundSize: '61px 100%' }} />

        <div className="relative z-10 px-10 flex-1">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7c3aed' }}>
            Bienvenido de nuevo, {currentUser?.name}
          </p>
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
          {[
            { label: "Lobbies Abiertas", value: openLobbies.length || "—" },
            { label: "Total Lobbies", value: lobbies.length || "—" },
            { label: "Publicaciones", value: posts.length || "—" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-black" style={{ color: '#a78bfa' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        {/* Lobbies */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Lobbies Activas</h2>
            <button onClick={() => navigate("/lobbies")} className="text-xs font-semibold" style={{ color: '#7c3aed' }}>Ver todas →</button>
          </div>
          {lobbies.length === 0 ? (
            <p className="text-xs" style={{ color: '#4b5563' }}>No hay lobbies disponibles aún.</p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {lobbies.slice(0, 4).map((lobby) => (
                <LobbyCard key={lobby.id} lobby={lobby} />
              ))}
            </div>
          )}
        </div>

        {/* Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Últimas Publicaciones</h2>
          </div>
          <div
            onClick={() => navigate("/post/create")}
            className="rounded-2xl p-4 mb-4 flex items-center gap-3 cursor-pointer transition-all"
            style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.14)' }}
          >
            <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }}>
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm flex-1" style={{ color: '#4b5563' }}>Comparte algo con tu escuadra...</span>
            <span className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(124,58,237,0.25)', color: '#c4b5fd' }}>Publicar</span>
          </div>
          {posts.length === 0 ? (
            <p className="text-xs" style={{ color: '#4b5563' }}>No hay publicaciones aún. ¡Sé el primero!</p>
          ) : (
            <div className="flex flex-col gap-4 max-w-2xl">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
