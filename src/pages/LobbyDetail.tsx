import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LobbyChat from "../components/lobby/LobbyChat";
import MainLayout from "../components/layout/MainLayout";
import { getLobbyById, getLobbyMembers, joinLobby, leaveLobby, getLobbyStatus } from "../services/lobbyService";
import type { LobbyData, LobbyMemberData } from "../services/lobbyService";
import { getUser } from "../services/authService";

const gameAccent: Record<string, string> = {
  Valorant: "#ff4655",
  CS2: "#f5a623",
  "League of Legends": "#00bcd4",
  Fortnite: "#9c27b0",
  "Apex Legends": "#ff6b35",
  "Overwatch 2": "#f97316",
  "Rocket League": "#3b82f6",
};

const avatarColors = [
  "linear-gradient(135deg, #7c3aed, #4c1d95)",
  "linear-gradient(135deg, #0ea5e9, #0284c7)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
];

const LobbyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentUser = getUser();

  const [lobby, setLobby] = useState<LobbyData | null>(null);
  const [members, setMembers] = useState<LobbyMemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lobbyId = parseInt(id ?? "0");

  const isMember = members.some((m) => m.user_id === currentUser?.id);
  const isOwner = lobby?.owner_id === currentUser?.id;
  const status = lobby ? getLobbyStatus(lobby) : "open";
  const accent = lobby ? (gameAccent[lobby.game] || "#7c3aed") : "#7c3aed";

  useEffect(() => {
    if (!lobbyId) return;
    Promise.all([getLobbyById(lobbyId), getLobbyMembers(lobbyId)])
      .then(([lobbyData, membersData]) => {
        setLobby(lobbyData);
        setMembers(membersData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lobbyId]);

  const handleJoin = async () => {
    if (!lobby) return;
    setActionLoading(true);
    try {
      await joinLobby(lobbyId);
      const [updated, updatedMembers] = await Promise.all([getLobbyById(lobbyId), getLobbyMembers(lobbyId)]);
      setLobby(updated);
      setMembers(updatedMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al unirse");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    setActionLoading(true);
    try {
      await leaveLobby(lobbyId);
      const [updated, updatedMembers] = await Promise.all([getLobbyById(lobbyId), getLobbyMembers(lobbyId)]);
      setLobby(updated);
      setMembers(updatedMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al salir");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm" style={{ color: '#6b7280' }}>Cargando lobby...</p>
      </div>
    </MainLayout>
  );

  if (error || !lobby) return (
    <MainLayout>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-sm" style={{ color: '#f87171' }}>{error ?? "Lobby no encontrado"}</p>
        <button onClick={() => navigate("/lobbies")} className="text-xs text-purple-400 hover:text-purple-300">
          Volver a Lobbies
        </button>
      </div>
    </MainLayout>
  );

  const emptySlots = Math.max(0, lobby.max_members - members.length);

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Header */}
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
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{lobby.game}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{
                background: status === "open" ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                color: status === "open" ? '#4ade80' : '#f87171'
              }}>
                {status === "open" ? "Abierto" : "Lleno"}
              </span>
            </div>
            <h1 className="text-2xl font-black">{lobby.name}</h1>
            <p className="text-xs" style={{ color: '#6b7280' }}>por {lobby.owner_name}</p>
          </div>

          <div className="relative z-10 flex gap-3">
            {error && <p className="text-xs self-center" style={{ color: '#f87171' }}>{error}</p>}
            {!isOwner && (
              isMember ? (
                <button
                  onClick={handleLeave}
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest flex-shrink-0 transition-all disabled:opacity-50"
                  style={{ border: `1px solid ${accent}55`, color: accent, background: 'transparent' }}
                >
                  {actionLoading ? "..." : "Salir del Lobby"}
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={actionLoading || status === "full"}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest flex-shrink-0 transition-all disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}88)`, boxShadow: `0 0 20px ${accent}55` }}
                >
                  {actionLoading ? "..." : "Unirse al Lobby"}
                </button>
              )
            )}
            {isOwner && (
              <span className="text-xs self-center px-3 py-1.5 rounded-full font-bold" style={{ background: `${accent}22`, color: accent }}>
                Tu lobby
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
            {/* About */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Acerca de</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{lobby.description || "Sin descripción."}</p>
            </div>

            {/* Members */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Miembros</h3>
                <span className="text-xs font-bold" style={{ color: accent }}>{members.length}/{lobby.max_members}</span>
              </div>
              <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-1.5 rounded-full" style={{ width: `${Math.min((members.length / lobby.max_members) * 100, 100)}%`, background: `linear-gradient(90deg, ${accent}, #7c3aed)` }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {members.map((member, i) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${accent}44`;
                      (e.currentTarget as HTMLDivElement).style.background = `${accent}11`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ background: avatarColors[i % avatarColors.length] }}>
                      {member.user_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{member.user_name}</p>
                      {member.user_id === lobby.owner_id && (
                        <span className="text-xs font-bold" style={{ color: accent }}>Líder</span>
                      )}
                    </div>
                  </div>
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: `${accent}08`, border: `1px dashed ${accent}33` }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: `1px dashed ${accent}55` }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: accent }}>Slot libre</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="w-96 flex-shrink-0 flex flex-col" style={{ borderLeft: `1px solid ${accent}15`, height: '100%' }}>
            <LobbyChat lobbyId={lobby.id} lobbyName={lobby.name} lobbyGame={lobby.game} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LobbyDetail;
