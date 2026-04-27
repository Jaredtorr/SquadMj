import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { getUser, getAvatarUrl } from "../services/authService";
import { createPost, addPostImage, getPostsByUser } from "../services/postService";
import type { PostData } from "../services/postService";

const CreatePost = () => {
  const navigate = useNavigate();
  const currentUser = getUser();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recentPosts, setRecentPosts] = useState<PostData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!currentUser) return;
    getPostsByUser(currentUser.id)
      .then((posts) => setRecentPosts(posts.slice(0, 3)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = `rgba(124,58,237,${0.04 + Math.sin(t * 0.02) * 0.02})`;
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height - 80 - w * 40 +
            Math.sin((x * 0.008) + t * 0.02 + w * 1.2) * 20 +
            Math.sin((x * 0.015) + t * 0.015 + w * 0.8) * 15;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = `rgba(124,58,237,${0.06 - w * 0.015})`;
        ctx.fill();
      }

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.opacity})`;
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  const handlePost = async () => {
    if (!content.trim()) { setError("El contenido es requerido"); return; }
    setLoading(true);
    setError("");
    try {
      const post = await createPost(content.trim());
      if (imageFile) await addPostImage(post.id, imageFile);
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al publicar");
    } finally {
      setLoading(false);
    }
  };

  const tips = [
    { icon: "🎯", title: "Sé específico", tip: "Menciona el juego y el rol que buscas" },
    { icon: "⚡", title: "Tu rango", tip: "Comparte tu rango para atraer jugadores similares" },
    { icon: "🎮", title: "Horario", tip: "Indica cuándo juegas normalmente" },
  ];

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <MainLayout>
      <div className="flex flex-1 relative" style={{ minHeight: '100vh' }}>
        <div className="flex-1 flex flex-col justify-center px-12 py-8 relative z-10" style={{ maxWidth: '520px' }}>
          <button onClick={() => navigate("/home")} className="flex items-center gap-1.5 text-xs mb-6 w-fit" style={{ color: '#6b7280' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </button>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#7c3aed' }}>Nueva publicación</p>
          <h1 className="text-4xl font-black mb-8">
            Crear{" "}
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
              Publicación
            </span>
          </h1>

          <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              {getAvatarUrl(currentUser?.profile_picture) ? (
                <img src={getAvatarUrl(currentUser.profile_picture)!} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }}>
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white">{currentUser?.name}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>Publicando ahora</p>
              </div>
            </div>

            <div>
              <textarea
                value={content}
                onChange={(e) => { setContent(e.target.value); setError(""); }}
                placeholder="¿Qué está haciendo tu squad?"
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none resize-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(124,58,237,0.25)' }}
              />
              {error && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{error}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="imageUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageFile(file);
                }}
              />
              <label
                htmlFor="imageUpload"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agregar imagen
              </label>
              <span className="text-xs" style={{ color: '#4b5563' }}>PNG, JPG hasta 5MB</span>
            </div>

            <button
              onClick={handlePost}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase disabled:opacity-50 transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
            >
              {loading ? "Publicando..." : "Publicar"}
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
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.2) 0%, transparent 60%)', zIndex: 1 }} />

          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.15)' }} />
          <div className="absolute top-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(168,85,247,0.08)' }} />

          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(124,58,237,0.3)' }} />
            <div className="absolute" style={{ bottom: '1px', animation: 'runRight 8s linear infinite' }}>
              <svg width="32" height="48" viewBox="0 0 16 24" style={{ imageRendering: 'pixelated' }}>
                <rect x="5" y="0" width="6" height="6" fill="#a78bfa" />
                <rect x="4" y="6" width="8" height="7" fill="#7c3aed" />
                <rect x="12" y="8" width="4" height="2" fill="#c4b5fd" />
                <rect x="4" y="13" width="3" height="5" fill="#6d28d9" />
                <rect x="9" y="13" width="3" height="5" fill="#6d28d9" />
                <rect x="6" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '1px', animation: 'runLeft 10s linear infinite', animationDelay: '2s' }}>
              <svg width="32" height="48" viewBox="0 0 16 24" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
                <rect x="5" y="0" width="6" height="6" fill="#60a5fa" />
                <rect x="4" y="6" width="8" height="7" fill="#2563eb" />
                <rect x="12" y="8" width="4" height="2" fill="#93c5fd" />
                <rect x="4" y="13" width="3" height="5" fill="#1d4ed8" />
                <rect x="9" y="13" width="3" height="5" fill="#1d4ed8" />
                <rect x="6" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '1px', left: '40%', animation: 'jump 2s ease-in-out infinite', animationDelay: '1s' }}>
              <svg width="32" height="48" viewBox="0 0 16 24" style={{ imageRendering: 'pixelated' }}>
                <rect x="5" y="0" width="6" height="6" fill="#f59e0b" />
                <rect x="4" y="6" width="8" height="7" fill="#d97706" />
                <rect x="12" y="8" width="4" height="2" fill="#fcd34d" />
                <rect x="5" y="13" width="2" height="5" fill="#b45309" />
                <rect x="9" y="13" width="2" height="5" fill="#b45309" />
                <rect x="6" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="9" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '20px', animation: 'bulletRight 1.5s linear infinite', animationDelay: '0.5s' }}>
              <svg width="12" height="6" viewBox="0 0 6 3" style={{ imageRendering: 'pixelated' }}>
                <rect x="0" y="1" width="4" height="1" fill="#fcd34d" />
                <rect x="4" y="0" width="2" height="3" fill="#f59e0b" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '20px', animation: 'bulletLeft 1.2s linear infinite', animationDelay: '3s' }}>
              <svg width="12" height="6" viewBox="0 0 6 3" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
                <rect x="0" y="1" width="4" height="1" fill="#93c5fd" />
                <rect x="4" y="0" width="2" height="3" fill="#60a5fa" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '10px', left: '55%', animation: 'explode 2s ease-in-out infinite', animationDelay: '1.5s' }}>
              <svg width="32" height="32" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                <rect x="7" y="0" width="2" height="3" fill="#fcd34d" />
                <rect x="7" y="13" width="2" height="3" fill="#fcd34d" />
                <rect x="0" y="7" width="3" height="2" fill="#fcd34d" />
                <rect x="13" y="7" width="3" height="2" fill="#fcd34d" />
                <rect x="5" y="5" width="6" height="6" fill="#ff4655" />
                <rect x="6" y="4" width="4" height="8" fill="#ff4655" />
                <rect x="4" y="6" width="8" height="4" fill="#ff4655" />
                <rect x="6" y="6" width="4" height="4" fill="#fcd34d" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 pt-8 pr-8 pb-8 pl-16 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#a78bfa' }}>Comparte tu experiencia</p>
              <h2 className="text-2xl font-black text-white">
                Cuéntale a tu{" "}
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>Squad</span>
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Posts", value: String(recentPosts.length || 0), color: '#a78bfa' }, { label: "Alcance", value: "—", color: '#60a5fa' }, { label: "Likes", value: "—", color: '#f472b6' }].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 text-center relative overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${stat.color}33` }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-4px) scale(1.05)';
                    el.style.border = `1px solid ${stat.color}88`;
                    el.style.background = `${stat.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.border = `1px solid ${stat.color}33`;
                    el.style.background = 'rgba(0,0,0,0.3)';
                  }}
                >
                  <p className="text-2xl font-black relative z-10" style={{ color: stat.color, fontFamily: 'Orbitron, sans-serif' }}>{stat.value}</p>
                  <p className="text-xs relative z-10 mt-1" style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280', fontFamily: 'Orbitron, sans-serif' }}>Tips para un buen post</p>
              <div className="flex flex-col gap-2">
                {tips.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden transition-all"
                    style={{
                      background: 'rgba(124,58,237,0.08)',
                      border: '1px solid rgba(167,139,250,0.3)',
                      boxShadow: '0 0 16px rgba(124,58,237,0.15), inset 0 0 20px rgba(124,58,237,0.05)',
                    }}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-20" style={{ background: 'radial-gradient(ellipse at top right, #a78bfa, transparent)' }} />
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-black mb-0.5 uppercase tracking-wide" style={{ color: '#e9d5ff', fontFamily: 'Orbitron, sans-serif', fontSize: '11px' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Tus posts recientes</p>
              {recentPosts.length === 0 ? (
                <p className="text-xs" style={{ color: '#4b5563' }}>Aún no tienes publicaciones.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 rounded-xl relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(124,58,237,0.15)' }}>
                      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)' }} />
                      <p className="text-sm font-medium mb-3 line-clamp-1" style={{ color: '#e5e7eb' }}>{post.description}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>{formatTime(post.createdAt)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes runRight { from { left: -40px; } to { left: 100%; } }
        @keyframes runLeft { from { right: -40px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
        @keyframes bulletRight { from { left: -20px; } to { left: 100%; } }
        @keyframes bulletLeft { from { right: -20px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes explode { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.5); } }
      `}</style>
    </MainLayout>
  );
};

export default CreatePost;