import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightPanel from "../components/layout/RightPanel";
import LobbyListComponent from "../components/lobby/LobbyList";

const LobbyListPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <RightPanel />
      <main className="ml-60 mr-60 pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-black uppercase tracking-widest">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Lobbies</span>
            </h1>
            <button onClick={() => navigate("/lobbies/create")} className="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all">
              + Nuevo Lobby
            </button>
          </div>
          <LobbyListComponent />
        </div>
      </main>
    </div>
  );
};

export default LobbyListPage;