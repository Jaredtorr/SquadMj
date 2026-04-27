import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { createLobby } from "../services/lobbyService";

const games = ["Valorant", "League of Legends", "CS2", "Fortnite", "Apex Legends", "Overwatch 2", "Rocket League"];

const gameAccent: Record<string, string> = {
  Valorant: "#ff4655",
  CS2: "#f5a623",
  "League of Legends": "#00bcd4",
  Fortnite: "#9c27b0",
  "Apex Legends": "#ff6b35",
  "Overwatch 2": "#f97316",
  "Rocket League": "#3b82f6",
};

const activeLobbies = [
  { title: "Ranked Squad", game: "Valorant", status: "open" },
  { title: "Chill Games", game: "LoL", status: "open" },
  { title: "Pro Team", game: "CS2", status: "full" },
];

const CreateLobby = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game, setGame] = useState("");
  const [maxMembers, setMaxMembers] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const accent = gameAccent[game] || "#7c3aed";

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "El nombre del lobby es obligatorio.";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!game) newErrors.game = "Selecciona un juego.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setApiError(null);
    setLoading(true);
    try {
      await createLobby({ name: title, description, game, max_members: maxMembers, image: imageFile ?? undefined });
      navigate("/lobbies");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Error al crear lobby");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-1 relative" style={{ minHeight: '100vh' }}>
        <div className="flex-1 flex flex-col justify-center px-12 py-8 relative z-10" style={{ maxWidth: '560px' }}>
          <button onClick={() => navigate("/lobbies")} className="flex items-center gap-1.5 text-xs mb-6 w-fit transition-all" style={{ color: '#6b7280' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Lobbies
          </button>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent, fontFamily: 'Orbitron, sans-serif', transition: 'color 0.3s' }}>Nuevo Lobby</p>
          <h1 className="text-4xl font-black mb-8">
            Crear{" "}
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: `linear-gradient(90deg, ${accent}, #60a5fa)`, backgroundClip: 'text' }}>
              Lobby
            </span>
          </h1>

          <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Nombre del Lobby</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mi Squad Increíble" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: errors.title ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)' }} />
              {errors.title && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.title}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Juego</label>
              <select value={game} onChange={(e) => setGame(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all" style={{ background: '#0d0820', border: errors.game ? '1px solid rgba(239,68,68,0.5)' : `1px solid ${accent}44` }}>
                <option value="" style={{ background: '#0d0820' }}>Selecciona un juego...</option>
                {games.map((g) => (<option key={g} value={g} style={{ background: '#0d0820' }}>{g}</option>))}
              </select>
              {errors.game && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.game}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu lobby, requisitos, objetivos..." rows={3} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none resize-none transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: errors.description ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)' }} />
              {errors.description && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.description}</p>}
            </div>

            {/* Imagen del lobby */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Imagen del Lobby <span style={{ color: '#4b5563' }}>(opcional)</span></label>
              <label
                className="flex flex-col items-center justify-center w-full rounded-xl cursor-pointer transition-all overflow-hidden"
                style={{
                  border: `1px dashed ${imagePreview ? accent : 'rgba(255,255,255,0.12)'}`,
                  background: imagePreview ? 'transparent' : 'rgba(255,255,255,0.02)',
                  minHeight: imagePreview ? 'auto' : '80px',
                }}
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    <img src={imagePreview} alt="preview" className="w-full object-cover rounded-xl" style={{ maxHeight: '160px' }} />
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-all" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <p className="text-xs font-bold text-white">Cambiar imagen</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-5">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#4b5563' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs" style={{ color: '#4b5563' }}>Click para subir imagen</p>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>
                Máximo de miembros: <span style={{ color: accent }}>{maxMembers}</span>
              </label>
              <input type="range" min={2} max={10} value={maxMembers} onChange={(e) => setMaxMembers(Number(e.target.value))} className="w-full" style={{ accentColor: accent }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#4b5563' }}>
                <span>2</span><span>10</span>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-lg transition-all duration-200" style={{ background: i < maxMembers ? `${accent}33` : 'rgba(255,255,255,0.04)', border: i < maxMembers ? `1px solid ${accent}66` : '1px solid rgba(255,255,255,0.06)' }} />
                ))}
              </div>
            </div>

            {apiError && (
              <p className="text-pink-400 text-xs text-center py-2 px-3 rounded-lg bg-pink-500/10 border border-pink-500/20">{apiError}</p>
            )}
            <button onClick={handleCreate} disabled={loading} className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: `linear-gradient(135deg, ${accent}cc, #7c3aed)`, boxShadow: `0 0 20px ${accent}44`, fontFamily: 'Orbitron, sans-serif' }}>
              {loading ? "Creando..." : "Crear Lobby"}
            </button>
          </div>
        </div>

        <div
          className="relative flex-1 overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #1a0a3e 0%, #0d1a4a 50%, #0a0818 100%)',
            clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 80%, 6% 60%, 0% 40%, 6% 20%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}18 0%, transparent 70%)`, zIndex: 1 }} />
          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.15)' }} />
          <div className="absolute top-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.08)' }} />

          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `rgba(124,58,237,0.3)` }} />

            <div className="absolute" style={{ bottom: '1px', animation: 'runRight 9s linear infinite' }}>
              <svg width="40" height="56" viewBox="0 0 20 28" style={{ imageRendering: 'pixelated' }}>
                <rect x="9" y="0" width="1" height="8" fill="#c4b5fd" />
                <rect x="10" y="1" width="5" height="3" fill="#7c3aed" />
                <rect x="6" y="8" width="6" height="6" fill="#a78bfa" />
                <rect x="7" y="9" width="1" height="1" fill="#0d0820" />
                <rect x="10" y="9" width="1" height="1" fill="#0d0820" />
                <rect x="5" y="14" width="8" height="7" fill="#6d28d9" />
                <rect x="6" y="15" width="6" height="5" fill="#7c3aed" />
                <rect x="13" y="10" width="1" height="8" fill="#e9d5ff" />
                <rect x="11" y="14" width="4" height="1" fill="#c4b5fd" />
                <rect x="5" y="21" width="3" height="5" fill="#4c1d95" />
                <rect x="10" y="21" width="3" height="5" fill="#4c1d95" />
                <rect x="2" y="14" width="3" height="4" fill="#7c3aed" />
                <rect x="3" y="15" width="1" height="2" fill="#c4b5fd" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', animation: 'runLeft 11s linear infinite', animationDelay: '3s' }}>
              <svg width="40" height="56" viewBox="0 0 20 28" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
                <rect x="9" y="0" width="1" height="8" fill="#93c5fd" />
                <rect x="10" y="1" width="5" height="3" fill="#2563eb" />
                <rect x="6" y="8" width="6" height="6" fill="#60a5fa" />
                <rect x="7" y="9" width="1" height="1" fill="#0d0820" />
                <rect x="10" y="9" width="1" height="1" fill="#0d0820" />
                <rect x="5" y="14" width="8" height="7" fill="#1d4ed8" />
                <rect x="6" y="15" width="6" height="5" fill="#2563eb" />
                <rect x="13" y="10" width="1" height="8" fill="#e9d5ff" />
                <rect x="11" y="14" width="4" height="1" fill="#bfdbfe" />
                <rect x="5" y="21" width="3" height="5" fill="#1e40af" />
                <rect x="10" y="21" width="3" height="5" fill="#1e40af" />
                <rect x="2" y="14" width="3" height="4" fill="#2563eb" />
                <rect x="3" y="15" width="1" height="2" fill="#93c5fd" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', left: '45%', animation: 'jump 2.5s ease-in-out infinite', animationDelay: '1s' }}>
              <svg width="40" height="56" viewBox="0 0 20 28" style={{ imageRendering: 'pixelated' }}>
                <rect x="9" y="0" width="1" height="10" fill="#fcd34d" />
                <rect x="10" y="1" width="5" height="3" fill="#f59e0b" />
                <rect x="6" y="10" width="6" height="6" fill="#fcd34d" />
                <rect x="7" y="11" width="1" height="1" fill="#0d0820" />
                <rect x="10" y="11" width="1" height="1" fill="#0d0820" />
                <rect x="5" y="16" width="8" height="6" fill="#d97706" />
                <rect x="6" y="17" width="6" height="4" fill="#f59e0b" />
                <rect x="14" y="5" width="1" height="10" fill="#e9d5ff" />
                <rect x="12" y="10" width="4" height="1" fill="#fcd34d" />
                <rect x="5" y="22" width="3" height="4" fill="#b45309" />
                <rect x="10" y="22" width="3" height="4" fill="#b45309" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '8px', left: '30%', animation: 'clash 3s ease-in-out infinite', animationDelay: '2s' }}>
              <svg width="40" height="40" viewBox="0 0 20 20" style={{ imageRendering: 'pixelated' }}>
                <rect x="9" y="0" width="2" height="4" fill="#fcd34d" />
                <rect x="9" y="16" width="2" height="4" fill="#fcd34d" />
                <rect x="0" y="9" width="4" height="2" fill="#fcd34d" />
                <rect x="16" y="9" width="4" height="2" fill="#fcd34d" />
                <rect x="2" y="2" width="3" height="3" fill="#f59e0b" />
                <rect x="15" y="2" width="3" height="3" fill="#f59e0b" />
                <rect x="2" y="15" width="3" height="3" fill="#f59e0b" />
                <rect x="15" y="15" width="3" height="3" fill="#f59e0b" />
                <rect x="7" y="7" width="6" height="6" fill="#fff" />
                <rect x="8" y="6" width="4" height="8" fill="#fcd34d" />
                <rect x="6" y="8" width="8" height="4" fill="#fcd34d" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '25px', animation: 'swordRight 2s linear infinite', animationDelay: '1s' }}>
              <svg width="20" height="8" viewBox="0 0 10 4" style={{ imageRendering: 'pixelated' }}>
                <rect x="0" y="1" width="6" height="2" fill="#e9d5ff" />
                <rect x="6" y="0" width="3" height="4" fill="#c4b5fd" />
                <rect x="2" y="1" width="1" height="2" fill="#a78bfa" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '25px', animation: 'swordLeft 1.8s linear infinite', animationDelay: '3.5s' }}>
              <svg width="20" height="8" viewBox="0 0 10 4" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
                <rect x="0" y="1" width="6" height="2" fill="#93c5fd" />
                <rect x="6" y="0" width="3" height="4" fill="#60a5fa" />
                <rect x="2" y="1" width="1" height="2" fill="#3b82f6" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 pt-8 pr-8 pb-8 pl-16 flex flex-col gap-5 overflow-y-auto">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent, fontFamily: 'Orbitron, sans-serif' }}>Arma tu equipo</p>
              <h2 className="text-2xl font-black text-white">
                Crea tu{" "}
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: `linear-gradient(90deg, ${accent}, #60a5fa)`, backgroundClip: 'text' }}>
                  Squad
                </span>
              </h2>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${accent}33`, boxShadow: `0 0 16px ${accent}15` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Preview</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{game || "Juego"}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>Abierto</span>
              </div>
              <h3 className="text-base font-black text-white mb-1">{title || "Nombre del Lobby"}</h3>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: '#6b7280' }}>{description || "Descripción del lobby..."}</p>
              <div className="flex gap-1.5">
                {Array.from({ length: maxMembers }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full" style={{ background: i === 0 ? `linear-gradient(135deg, ${accent}, #7c3aed)` : 'rgba(255,255,255,0.08)', border: `1px solid ${accent}33` }} />
                ))}
              </div>
              <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-1 rounded-full transition-all" style={{ width: `${(1 / maxMembers) * 100}%`, background: `linear-gradient(90deg, ${accent}, #7c3aed)` }} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Tips para un buen lobby</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: "🎯", title: "Sé claro", tip: "Especifica el nivel de juego que buscas" },
                  { icon: "🎙️", title: "Comunicación", tip: "Indica si se requiere micrófono o no" },
                  { icon: "⏰", title: "Horario", tip: "Menciona cuándo estarás activo" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl relative overflow-hidden" style={{ background: 'rgba(124,58,237,0.08)', border: `1px solid ${accent}22` }}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: `linear-gradient(180deg, ${accent}, #7c3aed)`, boxShadow: `0 0 8px ${accent}` }} />
                    <span className="text-xl pl-2">{item.icon}</span>
                    <div>
                      <p className="text-xs font-black mb-0.5 uppercase tracking-wide" style={{ color: '#e9d5ff', fontFamily: 'Orbitron, sans-serif', fontSize: '10px' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: '#9ca3af' }}>{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes runRight { from { left: -50px; } to { left: 100%; } }
        @keyframes runLeft { from { right: -50px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-45px); } }
        @keyframes clash { 0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 1; transform: scale(1.5) rotate(45deg); } }
        @keyframes swordRight { from { left: -30px; } to { left: 100%; } }
        @keyframes swordLeft { from { right: -30px; left: auto; } to { right: 100%; left: auto; } }
      `}</style>
    </MainLayout>
  );
};

export default CreateLobby;