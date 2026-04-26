import { useNavigate } from "react-router-dom";
import LobbyChat from "../components/lobby/LobbyChat";
import MainLayout from "../components/layout/MainLayout";

const mockLobby = {
  id: 1,
  title: "Ranked Squad",
  description: "Buscamos jugadores serios para partidas ranked. Se requiere micrófono y buena actitud.",
  game: "Valorant",
  status: "open",
  max_members: 5,
  members: [
    { id: 1, username: "xSniper99" },
    { id: 2, username: "ProGamer_Mia" },
    { id: 3, username: "DarkLord_CS" },
  ],
  owner: { id: 1, username: "xSniper99" },
  requirements: "Diamante+, Micrófono requerido, Solo español",
  rules: "Respeto ante todo, No toxicidad, Comunicación constante, Puntualidad en sesiones",
};

const statusLabel: Record<string, string> = { open: "Abierto", full: "Lleno" };

const gameAccent: Record<string, string> = {
  Valorant: "#ff4655",
  CS2: "#f5a623",
  "League of Legends": "#00bcd4",
  Fortnite: "#9c27b0",
  "Apex Legends": "#ff6b35",
};

const memberColors: Record<string, string> = {
  xSniper99: "linear-gradient(135deg, #7c3aed, #4c1d95)",
  ProGamer_Mia: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  DarkLord_CS: "linear-gradient(135deg, #f59e0b, #d97706)",
};

const LobbyDetail = () => {
  const navigate = useNavigate();
  const accent = gameAccent[mockLobby.game] || "#7c3aed";

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="relative px-8 py-5 flex items-center justify-between flex-shrink-0" style={{ background: 'linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)', borderBottom: `1px solid ${accent}33` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}18 0%, transparent 70%)` }} />
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
          <div className="relative z-10 flex flex-col gap-1 pl-4">
            <button onClick={() => navigate("/lobbies")} className="flex items-center gap-1.5 text-xs mb-1 w-fit transition-all" style={{ color: '#6b7280' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Lobbies
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{mockLobby.game}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>
                {statusLabel[mockLobby.status] ?? mockLobby.status}
              </span>
            </div>
            <h1 className="text-2xl font-black">{mockLobby.title}</h1>
          </div>
          <button className="relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest flex-shrink-0 transition-all" style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}88)`, boxShadow: `0 0 20px ${accent}55` }}>
            Unirse al Lobby
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Acerca de</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{mockLobby.description}</p>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Requisitos</h3>
              <div className="flex flex-wrap gap-2">
                {mockLobby.requirements.split(", ").map((req) => (
                  <span key={req} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}>
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Miembros</h3>
                <span className="text-xs font-bold" style={{ color: accent }}>{mockLobby.members.length}/{mockLobby.max_members}</span>
              </div>
              <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-1.5 rounded-full" style={{ width: `${(mockLobby.members.length / mockLobby.max_members) * 100}%`, background: `linear-gradient(90deg, ${accent}, #7c3aed)`, animation: 'fillBar 1s ease-out forwards' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockLobby.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${accent}44`;
                      (e.currentTarget as HTMLDivElement).style.background = `${accent}11`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 12px ${accent}22`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: memberColors[member.username] || 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
                    <div>
                      <p className="text-sm font-bold text-white">{member.username}</p>
                      {member.id === mockLobby.owner.id && (
                        <span className="text-xs font-bold" style={{ color: accent }}>Líder</span>
                      )}
                    </div>
                  </div>
                ))}
                {Array.from({ length: mockLobby.max_members - mockLobby.members.length }).map((_, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all w-full text-left"
                    style={{ background: `${accent}08`, border: `1px dashed ${accent}33` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = `${accent}18`;
                      (e.currentTarget as HTMLButtonElement).style.border = `1px dashed ${accent}66`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = `${accent}08`;
                      (e.currentTarget as HTMLButtonElement).style.border = `1px dashed ${accent}33`;
                    }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: `1px dashed ${accent}55` }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: accent }}>Unirse</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Reglas del Lobby</h3>
              <div className="flex flex-col gap-2">
                {mockLobby.rules.split(", ").map((rule, i) => (
                  <div key={rule} className="flex items-center gap-3">
                    <span className="text-xs font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${accent}22`, color: accent }}>
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: '#d1d5db' }}>{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-96 flex-shrink-0 flex flex-col" style={{ borderLeft: `1px solid ${accent}15`, height: '100%' }}>
            <LobbyChat />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: ${(mockLobby.members.length / mockLobby.max_members) * 100}%; }
        }
      `}</style>
    </MainLayout>
  );
};

export default LobbyDetail;