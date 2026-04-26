import { useNavigate } from "react-router-dom";

interface Props {
  user: { username: string; bio?: string; created_at: string };
}

const ProfileHeader = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" style={{boxShadow: '0 0 24px rgba(168,85,247,0.4)'}} />
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white mb-1">{user.username}</h1>
          <p className="text-gray-400 text-sm mb-3">{user.bio || "Sin biografía aún."}</p>
          <p className="text-xs text-gray-600">Se unió el {new Date(user.created_at).toLocaleDateString("es-MX")}</p>
        </div>
        <button onClick={() => navigate("/profile/edit")} className="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-gray-400">
          Editar perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;