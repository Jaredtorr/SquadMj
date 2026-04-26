import { useNavigate } from "react-router-dom";

interface Props {
  lobby: {
    id: number;
    title: string;
    description: string;
    game: string;
    status: "open" | "full" | "closed";
    members: number;
    max: number;
    owner: string;
  };
}

const LobbyCard = ({ lobby }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lobbies/${lobby.id}`)}
      className="rounded-2xl p-4 cursor-pointer transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>{lobby.game}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: lobby.status === "open" ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: lobby.status === "open" ? '#4ade80' : '#f87171' }}>
          {lobby.status}
        </span>
      </div>
      <h3 className="text-sm font-black text-white mb-1">{lobby.title}</h3>
      <p className="text-xs mb-3 line-clamp-2" style={{ color: '#6b7280' }}>{lobby.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#6b7280' }}>{lobby.members}/{lobby.max} members</span>
        <span className="text-xs" style={{ color: '#6b7280' }}>by {lobby.owner}</span>
      </div>
      <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-1 rounded-full" style={{ width: `${(lobby.members / lobby.max) * 100}%`, background: lobby.status === "open" ? 'linear-gradient(90deg, #7c3aed, #60a5fa)' : '#ef4444' }} />
      </div>
    </div>
  );
};

export default LobbyCard;