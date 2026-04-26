import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const games = ["Valorant", "League of Legends", "CS2", "Fortnite", "Apex Legends", "Overwatch 2", "Rocket League"];

const CreateLobby = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game, setGame] = useState("");
  const [maxMembers, setMaxMembers] = useState(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "El nombre del lobby es obligatorio.";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!game) newErrors.game = "Selecciona un juego.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validate()) {
      console.log("Create lobby:", { title, description, game, maxMembers });
      navigate("/lobbies");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <main className="ml-60 pt-16 min-h-screen">
        <div className="max-w-xl mx-auto py-8 px-4 flex flex-col gap-6">
          <button
            onClick={() => navigate("/lobbies")}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm w-fit"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Lobbies
          </button>

          <h1 className="text-3xl font-black uppercase tracking-widest">
            Crear <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Lobby</span>
          </h1>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Nombre del Lobby</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mi Squad Increíble"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
              />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Juego</label>
              <select
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="" className="bg-[#0a0818]">Selecciona un juego...</option>
                {games.map((g) => (
                  <option key={g} value={g} className="bg-[#0a0818]">{g}</option>
                ))}
              </select>
              {errors.game && <p className="text-xs text-red-400 mt-1">{errors.game}</p>}
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe tu lobby, requisitos, objetivos..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Máximo de miembros: {maxMembers}</label>
              <input
                type="range"
                min={2}
                max={10}
                value={maxMembers}
                onChange={(e) => setMaxMembers(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>2</span>
                <span>10</span>
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Crear Lobby
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateLobby;