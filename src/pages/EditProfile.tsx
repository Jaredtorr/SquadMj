import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("xSniper99");
  const [bio, setBio] = useState("Gamer competitivo. Diamante en Valorant. Siempre buscando un buen squad 💜");
  const [email, setEmail] = useState("sniper@squadup.gg");

  const handleSave = () => {
    console.log("Save:", { username, bio, email });
    navigate("/profile/me");
  };

  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <main className="ml-60 pt-16 min-h-screen">
        <div className="max-w-xl mx-auto py-8 px-4 flex flex-col gap-6">
          <button
            onClick={() => navigate("/profile/me")}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm w-fit"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al perfil
          </button>

          <h1 className="text-3xl font-black uppercase tracking-widest">
            Editar <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Perfil</span>
          </h1>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" style={{boxShadow: '0 0 24px rgba(168,85,247,0.4)'}} />
              <button className="px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-gray-400">
                Cambiar avatar
              </button>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Biografía</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;