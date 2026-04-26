import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("xSniper99");
  const [bio, setBio] = useState("Gamer competitivo. Diamante en Valorant. Siempre buscando un buen squad 💜");
  const [email, setEmail] = useState("sniper@squadup.gg");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log("Save:", { username, bio, email });
    navigate("/profile/me");
  };

  return (
    <MainLayout>
      <div className="flex flex-1 relative" style={{ minHeight: '100vh' }}>
        <div className="flex-1 flex flex-col justify-center px-12 py-8 relative z-10" style={{ maxWidth: '520px' }}>
          <button onClick={() => navigate("/profile/me")} className="flex items-center gap-1.5 text-xs mb-6 w-fit" style={{ color: '#6b7280' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al perfil
          </button>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#7c3aed', fontFamily: 'Orbitron, sans-serif' }}>Tu identidad</p>
          <h1 className="text-4xl font-black mb-8">
            Editar{" "}
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
              Perfil
            </span>
          </h1>

          <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden cursor-pointer"
                style={{ background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}
                onClick={() => fileRef.current?.click()}
              >
                {avatarPreview && <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setAvatarPreview(URL.createObjectURL(file));
                }}
              />
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all block mb-1"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', background: 'rgba(255,255,255,0.04)', fontFamily: 'Orbitron, sans-serif' }}
                >
                  Cambiar avatar
                </button>
                <p className="text-xs" style={{ color: '#4b5563' }}>PNG, JPG hasta 5MB</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Biografía</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none resize-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
              />
              <p className="text-xs mt-1 text-right" style={{ color: '#4b5563' }}>{bio.length}/160</p>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.3)', fontFamily: 'Orbitron, sans-serif' }}
            >
              Guardar cambios
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
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.2) 0%, transparent 60%)', zIndex: 1 }} />
          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.15)' }} />
          <div className="absolute top-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.08)' }} />

          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(124,58,237,0.3)' }} />

            <div className="absolute" style={{ bottom: '1px', right: '40px' }}>
              <svg width="72" height="72" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
                <polygon points="2,14 16,2 30,14" fill="#7c3aed" />
                <polygon points="4,14 16,4 28,14" fill="#9333ea" />
                <rect x="4" y="14" width="24" height="16" fill="#4c1d95" />
                <rect x="5" y="15" width="22" height="14" fill="#6d28d9" />
                <rect x="12" y="22" width="8" height="8" fill="#2e1065" />
                <rect x="13" y="23" width="6" height="7" fill="#1e0a4a" />
                <rect x="6" y="17" width="5" height="5" fill="#60a5fa" />
                <rect x="7" y="18" width="3" height="3" fill="#93c5fd" />
                <rect x="21" y="17" width="5" height="5" fill="#60a5fa" />
                <rect x="22" y="18" width="3" height="3" fill="#93c5fd" />
                <rect x="20" y="4" width="4" height="6" fill="#4c1d95" />
                <rect x="21" y="2" width="2" height="3" fill="#374151" />
                <rect x="21" y="0" width="2" height="2" fill="#9ca3af" style={{ animation: 'smokePuff 1.2s steps(2) infinite' }} />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', right: '118px', animation: 'plantFlag 9s linear infinite' }}>
              <svg width="20" height="36" viewBox="0 0 10 18" style={{ imageRendering: 'pixelated' }}>
                <rect x="4" y="0" width="1" height="14" fill="#c4b5fd" />
                <rect x="5" y="1" width="4" height="4" fill="#7c3aed" />
                <rect x="5" y="1" width="4" height="2" fill="#a78bfa" />
                <rect x="3" y="13" width="4" height="2" fill="#4c1d95" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', animation: 'phase1Walk 9s linear infinite' }}>
              <svg width="36" height="56" viewBox="0 0 18 28" style={{ imageRendering: 'pixelated' }}>
                <rect x="12" y="0" width="1" height="12" fill="#c4b5fd" />
                <rect x="13" y="1" width="4" height="4" fill="#7c3aed" />
                <rect x="13" y="1" width="4" height="2" fill="#a78bfa" />
                <rect x="5" y="12" width="6" height="6" fill="#fcd34d" />
                <rect x="6" y="14" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="14" width="1" height="1" fill="#0d0820" />
                <rect x="7" y="16" width="2" height="1" fill="#d97706" />
                <rect x="4" y="18" width="8" height="6" fill="#7c3aed" />
                <rect x="5" y="19" width="6" height="4" fill="#6d28d9" />
                <rect x="11" y="18" width="2" height="3" fill="#7c3aed" />
                <rect x="2" y="19" width="2" height="3" fill="#7c3aed" />
                <rect x="5" y="24" width="2" height="4" fill="#4c1d95" style={{ animation: 'legWalkL 0.35s steps(2) infinite' }} />
                <rect x="9" y="24" width="2" height="4" fill="#4c1d95" style={{ animation: 'legWalkR 0.35s steps(2) infinite' }} />
                <rect x="4" y="27" width="3" height="2" fill="#2e1065" />
                <rect x="9" y="27" width="3" height="2" fill="#2e1065" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', right: '105px', animation: 'phase2Plant 9s linear infinite' }}>
              <svg width="36" height="56" viewBox="0 0 18 28" style={{ imageRendering: 'pixelated' }}>
                <rect x="5" y="4" width="6" height="6" fill="#fcd34d" />
                <rect x="6" y="6" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="6" width="1" height="1" fill="#0d0820" />
                <rect x="7" y="8" width="2" height="1" fill="#d97706" />
                <rect x="4" y="10" width="8" height="6" fill="#7c3aed" />
                <rect x="5" y="11" width="6" height="4" fill="#6d28d9" />
                <rect x="1" y="8" width="3" height="5" fill="#7c3aed" />
                <rect x="12" y="8" width="3" height="5" fill="#7c3aed" />
                <rect x="0" y="6" width="3" height="3" fill="#fcd34d" />
                <rect x="13" y="6" width="3" height="3" fill="#fcd34d" />
                <rect x="5" y="16" width="2" height="6" fill="#4c1d95" />
                <rect x="9" y="16" width="2" height="6" fill="#4c1d95" />
                <rect x="4" y="21" width="3" height="2" fill="#2e1065" />
                <rect x="9" y="21" width="3" height="2" fill="#2e1065" />
                <rect x="7" y="0" width="2" height="2" fill="#fcd34d" style={{ animation: 'hammerHit 0.2s steps(2) infinite' }} />
                <rect x="4" y="1" width="2" height="2" fill="#f59e0b" style={{ animation: 'hammerHit 0.2s steps(2) infinite alternate' }} />
                <rect x="10" y="1" width="2" height="2" fill="#f59e0b" style={{ animation: 'hammerHit 0.2s steps(2) infinite' }} />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '1px', right: '55px', animation: 'phase3Enter 9s linear infinite' }}>
              <svg width="36" height="56" viewBox="0 0 18 28" style={{ imageRendering: 'pixelated' }}>
                <rect x="5" y="8" width="6" height="6" fill="#fcd34d" />
                <rect x="6" y="10" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="10" width="1" height="1" fill="#0d0820" />
                <rect x="4" y="14" width="8" height="6" fill="#7c3aed" />
                <rect x="2" y="15" width="2" height="3" fill="#7c3aed" />
                <rect x="12" y="15" width="2" height="3" fill="#7c3aed" />
                <rect x="5" y="20" width="2" height="4" fill="#4c1d95" />
                <rect x="9" y="20" width="2" height="4" fill="#4c1d95" />
              </svg>
            </div>

            <div className="absolute" style={{ bottom: '18px', animation: 'bulletRight 4s linear infinite', animationDelay: '1s' }}>
              <svg width="10" height="10" viewBox="0 0 5 5" style={{ imageRendering: 'pixelated' }}>
                <rect x="2" y="0" width="1" height="5" fill="#fcd34d" />
                <rect x="0" y="2" width="5" height="1" fill="#fcd34d" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 pt-8 pr-8 pb-8 pl-16 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#a78bfa', fontFamily: 'Orbitron, sans-serif' }}>Personaliza tu perfil</p>
              <h2 className="text-2xl font-black text-white">
                Tu{" "}
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>identidad</span>
              </h2>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Preview</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden" style={{ background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 12px rgba(124,58,237,0.4)' }}>
                  {avatarPreview && <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{username || "Tu nombre"}</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>{email || "tu@email.com"}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{bio || "Tu biografía aparecerá aquí..."}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Tips para tu perfil</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: "🎯", title: "Sé específico", tip: "Menciona tu juego principal y rango" },
                  { icon: "🎙️", title: "Disponibilidad", tip: "Indica cuándo juegas normalmente" },
                  { icon: "💜", title: "Sé auténtico", tip: "Un buen perfil atrae mejores squads" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl relative overflow-hidden" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #a78bfa, #7c3aed)' }} />
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
        @keyframes phase1Walk {
          0%   { left: -50px; opacity: 1; }
          50%  { left: calc(100% - 130px); opacity: 1; }
          55%  { left: calc(100% - 130px); opacity: 0; }
          100% { left: calc(100% - 130px); opacity: 0; }
        }
        @keyframes phase2Plant {
          0%, 50%  { opacity: 0; }
          55%, 70% { opacity: 1; }
          75%      { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes phase3Enter {
          0%, 70%  { opacity: 0; transform: scaleX(1); }
          75%      { opacity: 1; transform: scaleX(1); }
          88%      { opacity: 1; transform: scaleX(0.3); }
          92%, 100%{ opacity: 0; transform: scaleX(0); }
        }
        @keyframes plantFlag {
          0%, 60%  { opacity: 0; }
          65%, 100%{ opacity: 1; }
        }
        @keyframes smokePuff {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-4px); opacity: 0; }
        }
        @keyframes hammerHit {
          0%   { transform: translate(0,0); }
          100% { transform: translate(2px, -2px); }
        }
        @keyframes legWalkL {
          0%   { transform: translateY(0); }
          100% { transform: translateY(3px); }
        }
        @keyframes legWalkR {
          0%   { transform: translateY(3px); }
          100% { transform: translateY(0); }
        }
        @keyframes bulletRight { from { left: -20px; } to { left: 100%; } }
      `}</style>
    </MainLayout>
  );
};

export default EditProfile;