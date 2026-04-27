import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import LobbyCard from "../components/lobby/LobbyCard";
import { getAllLobbies, getLobbyStatus } from "../services/lobbyService";
import type { LobbyData } from "../services/lobbyService";

const games = ["Todos", "Valorant", "CS2", "League of Legends", "Fortnite", "Apex Legends", "Overwatch 2", "Rocket League"];

const gameAccent: Record<string, string> = {
  Valorant: "#ff4655",
  CS2: "#f5a623",
  "League of Legends": "#00bcd4",
  Fortnite: "#9c27b0",
  "Apex Legends": "#ff6b35",
  "Overwatch 2": "#f97316",
  "Rocket League": "#3b82f6",
};

const LobbyListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeGame, setActiveGame] = useState("Todos");
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [lobbies, setLobbies] = useState<LobbyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllLobbies()
      .then(setLobbies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = lobbies.filter((lobby) => {
    const status = getLobbyStatus(lobby);
    const matchGame = activeGame === "Todos" || lobby.game === activeGame;
    const matchStatus = activeStatus === "Todos" || (activeStatus === "Abierto" ? status === "open" : status === "full");
    const matchSearch = lobby.name.toLowerCase().includes(search.toLowerCase()) || lobby.game.toLowerCase().includes(search.toLowerCase());
    return matchGame && matchStatus && matchSearch;
  });

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="relative px-8 py-6 flex-shrink-0" style={{ background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
          <div className="relative z-10 flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#7c3aed' }}>Explorar</p>
              <h1 className="text-3xl font-black uppercase tracking-widest">
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
                  Lobbies
                </span>
              </h1>
            </div>
            <button
              onClick={() => navigate("/lobbies/create")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}
            >
              + Nuevo Lobby
            </button>
          </div>

          <div className="relative z-10 mb-4">
            <div className="relative">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6b7280' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar lobbies..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '400px' }}
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 flex-wrap">
            {games.map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                style={{
                  background: activeGame === game ? (game === "Todos" ? 'rgba(124,58,237,0.3)' : `${gameAccent[game]}33`) : 'rgba(255,255,255,0.04)',
                  color: activeGame === game ? (game === "Todos" ? '#c4b5fd' : gameAccent[game]) : '#6b7280',
                  border: activeGame === game ? `1px solid ${game === "Todos" ? 'rgba(124,58,237,0.4)' : `${gameAccent[game]}55`}` : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {game}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              {["Todos", "Abierto", "Lleno"].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: activeStatus === s ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeStatus === s ? '#fff' : '#6b7280',
                    border: activeStatus === s ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm" style={{ color: '#6b7280' }}>Cargando lobbies...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <p className="text-lg font-black" style={{ color: '#4b5563' }}>No se encontraron lobbies</p>
              <p className="text-sm" style={{ color: '#4b5563' }}>Intenta con otros filtros o crea uno nuevo</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((lobby) => (
                <LobbyCard key={lobby.id} lobby={lobby} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LobbyListPage;
