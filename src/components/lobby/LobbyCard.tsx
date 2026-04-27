import { useNavigate } from "react-router-dom";
import type { LobbyData } from "../../services/lobbyService";
import { getLobbyStatus } from "../../services/lobbyService";

interface Props {
  lobby: LobbyData;
}

const LobbyCard = ({ lobby }: Props) => {
  const navigate = useNavigate();
  const status = getLobbyStatus(lobby);

  return (
    <div
      onClick={() => navigate(`/lobbies/${lobby.id}`)}
      className="rounded-2xl p-4 cursor-pointer transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(124,58,237,0.3)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.05)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>{lobby.game}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{
          background: status === "open" ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          color: status === "open" ? '#4ade80' : '#f87171'
        }}>
          {status === "open" ? "Abierto" : "Lleno"}
        </span>
      </div>
      <h3 className="text-sm font-black text-white mb-1">{lobby.name}</h3>
      <p className="text-xs mb-3 line-clamp-2" style={{ color: '#6b7280' }}>{lobby.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#6b7280' }}>{lobby.members_count}/{lobby.max_members} jugadores</span>
        <span className="text-xs" style={{ color: '#6b7280' }}>por {lobby.owner_name}</span>
      </div>
      <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-1 rounded-full" style={{
          width: `${Math.min((lobby.members_count / lobby.max_members) * 100, 100)}%`,
          background: status === "open" ? 'linear-gradient(90deg, #7c3aed, #60a5fa)' : '#ef4444'
        }} />
      </div>
    </div>
  );
};

export default LobbyCard;
