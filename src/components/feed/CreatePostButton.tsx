import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/post/create")}
      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-purple-500/20 hover:bg-purple-500/5 transition-all mb-4"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
      <span className="text-gray-500 text-sm">¿Qué está haciendo tu squad?</span>
      <button className="ml-auto px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold uppercase tracking-widest hover:from-purple-500 hover:to-blue-500 transition-all">
        Publicar
      </button>
    </div>
  );
};

export default CreatePostButton;