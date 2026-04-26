import { useNavigate } from "react-router-dom";

const mockLobbies = [
  { id: 1, title: "Ranked Squad", game: "Valorant", status: "open" },
  { id: 2, title: "Chill Games", game: "League of Legends", status: "open" },
  { id: 3, title: "Pro Team", game: "CS2", status: "full" },
];

const statusLabel: Record<string, string> = {
  open: "Abierto",
  full: "Lleno",
};

const RightPanel = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-60 bg-[#0a0818] border-l border-white/5 flex flex-col py-6 px-4 gap-4">
      <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Lobbies Activos</h3>
      {mockLobbies.map((lobby) => (
        <div
          key={lobby.id}
          onClick={() => navigate(`/lobbies/${lobby.id}`)}
          className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-white">{lobby.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${lobby.status === "open" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {statusLabel[lobby.status] ?? lobby.status}
            </span>
          </div>
          <span className="text-xs text-gray-500">{lobby.game}</span>
        </div>
      ))}
      <button
        onClick={() => navigate("/lobbies/create")}
        className="mt-auto w-full py-2 rounded-xl text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all"
      >
        + Nuevo Lobby
      </button>
    </aside>
  );
};

export default RightPanel;