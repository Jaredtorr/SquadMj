import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { getUser, getAvatarUrl, updateProfile, deleteAccount, logout } from "../services/authService";
import type { UserData } from "../services/authService";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getUser();
    if (!stored) { navigate("/login", { replace: true }); return; }
    setUser(stored);
    setUsername(stored.name);
    setEmail(stored.email);
    const avatar = getAvatarUrl(stored.profile_picture);
    if (avatar) setAvatarPreview(avatar);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!username.trim() || !email.trim()) {
      setError("Nombre y correo son obligatorios.");
      return;
    }
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", username.trim());
      formData.append("email", email.trim());
      if (avatarFile) formData.append("profile_picture", avatarFile);
      const updated = await updateProfile(user.id, formData);
      setUser(updated);
      setSuccess(true);
      setTimeout(() => navigate(`/profile/${updated.name}`), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      await deleteAccount(user.id);
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar cuenta");
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-1 relative" style={{ minHeight: '100vh' }}>
        <div className="flex-1 flex flex-col justify-center px-12 py-8 relative z-10" style={{ maxWidth: '520px' }}>
          <button onClick={() => navigate(`/profile/${user?.name ?? "me"}`)} className="flex items-center gap-1.5 text-xs mb-6 w-fit" style={{ color: '#6b7280' }}>
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
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden cursor-pointer"
                style={{ background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}
                onClick={() => fileRef.current?.click()}
              >
                {avatarPreview && <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />}
              </div>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all block mb-1"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', background: 'rgba(255,255,255,0.04)', fontFamily: 'Orbitron, sans-serif' }}
                >
                  Cambiar avatar
                </button>
                <p className="text-xs" style={{ color: '#4b5563' }}>PNG, JPG, WEBP hasta 5MB</p>
              </div>
            </div>

            {/* Username */}
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

            {/* Email */}
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

            {error && (
              <p className="text-pink-400 text-xs text-center py-2 px-3 rounded-lg bg-pink-500/10 border border-pink-500/20">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-xs text-center py-2 px-3 rounded-lg bg-green-500/10 border border-green-500/20">Perfil actualizado correctamente</p>
            )}

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.3)', fontFamily: 'Orbitron, sans-serif' }}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

          {/* Delete account */}
          <div className="mt-6 rounded-2xl p-5" style={{ border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#ef4444', fontFamily: 'Orbitron, sans-serif' }}>Zona de peligro</p>
            <p className="text-xs mb-4" style={{ color: '#6b7280' }}>Esta acción es permanente y no se puede deshacer.</p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all"
                style={{ border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', background: 'transparent', fontFamily: 'Orbitron, sans-serif' }}
              >
                Eliminar mi cuenta
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all disabled:opacity-50"
                  style={{ background: '#ef4444', color: 'white', fontFamily: 'Orbitron, sans-serif' }}
                >
                  {deleting ? "Eliminando..." : "Confirmar"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280', background: 'transparent', fontFamily: 'Orbitron, sans-serif' }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho decorativo — igual que antes */}
        <div
          className="relative flex-1 overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #1a0a3e 0%, #0d1a4a 50%, #0a0818 100%)',
            clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 80%, 6% 60%, 0% 40%, 6% 20%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.2) 0%, transparent 60%)', zIndex: 1 }} />

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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden" style={{ background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 12px rgba(124,58,237,0.4)' }}>
                  {avatarPreview && <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{username || "Tu nombre"}</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>{email || "tu@email.com"}</p>
                </div>
              </div>
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
    </MainLayout>
  );
};

export default EditProfile;
