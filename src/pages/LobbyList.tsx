import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import LobbyCard from "../components/lobby/LobbyCard";

const allLobbies = [
  { id: 1, title: "Ranked Squad", description: "Looking for serious players. Mic required.", game: "Valorant", status: "open" as const, members: 3, max: 5, owner: "xSniper99" },
  { id: 2, title: "Chill Games", description: "Just vibing, no pressure. All ranks welcome.", game: "League of Legends", status: "open" as const, members: 2, max: 5, owner: "ProGamer_Mia" },
  { id: 3, title: "Pro Team", description: "Competitive team. Diamond+ only. Daily practice.", game: "CS2", status: "full" as const, members: 5, max: 5, owner: "DarkLord_CS" },
  { id: 4, title: "Weekend Warriors", description: "Casual weekend gaming sessions. Fun over wins.", game: "Fortnite", status: "open" as const, members: 1, max: 4, owner: "NightOwl_G" },
  { id: 5, title: "Apex Predators", description: "Diamond+ players only. Serious ranked grind.", game: "Apex Legends", status: "open" as const, members: 2, max: 3, owner: "BladeRunner_X" },
  { id: 6, title: "Silver Scrubs", description: "Chill silver lobby, just having fun.", game: "Valorant", status: "open" as const, members: 3, max: 5, owner: "StellarAim" },
  { id: 7, title: "Baron Rush", description: "Macro focused team, voice chat required.", game: "League of Legends", status: "full" as const, members: 5, max: 5, owner: "NightOwl_G" },
  { id: 8, title: "Headshot Kings", description: "FPS enthusiasts. All ranks welcome.", game: "CS2", status: "open" as const, members: 2, max: 5, owner: "xSniper99" },
];

const games = ["Todos", "Valorant", "CS2", "League of Legends", "Fortnite", "Apex Legends"];

const gameAccent: Record<string, string> = {
  Valorant: "#ff4655",
  CS2: "#f5a623",
  "League of Legends": "#00bcd4",
  Fortnite: "#9c27b0",
  "Apex Legends": "#ff6b35",
};

const LobbyListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeGame, setActiveGame] = useState("Todos");
  const [activeStatus, setActiveStatus] = useState("Todos");

  const filtered = allLobbies.filter((lobby) => {
    const matchGame = activeGame === "Todos" || lobby.game === activeGame;
    const matchStatus = activeStatus === "Todos" || (activeStatus === "Abierto" ? lobby.status === "open" : lobby.status === "full");
    const matchSearch = lobby.title.toLowerCase().includes(search.toLowerCase()) || lobby.game.toLowerCase().includes(search.toLowerCase());
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
              {["Todos", "Abierto", "Lleno"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: activeStatus === status ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeStatus === status ? '#fff' : '#6b7280',
                    border: activeStatus === status ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {filtered.length === 0 ? (
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