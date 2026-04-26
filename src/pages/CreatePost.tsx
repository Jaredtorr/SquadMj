import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handlePost = () => {
    if (!content.trim()) {
      setError("El contenido de la publicación es obligatorio.");
      return;
    }
    console.log("Create post:", { content });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <main className="ml-60 pt-16 min-h-screen">
        <div className="max-w-xl mx-auto py-8 px-4 flex flex-col gap-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm w-fit"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </button>

          <h1 className="text-3xl font-black uppercase tracking-widest">
            Crear <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Publicación</span>
          </h1>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
              <span className="text-sm font-bold text-white">xSniper99</span>
            </div>

            <div>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError("");
                }}
                placeholder="¿Qué está haciendo tu squad?"
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
              />
              {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-gray-400 text-sm font-semibold">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agregar imagen
              </button>
              <span className="text-xs text-gray-600">PNG, JPG hasta 5MB</span>
            </div>

            <button
              onClick={handlePost}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Publicar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;