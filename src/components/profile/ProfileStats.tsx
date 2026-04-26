interface Props {
  posts: number;
  lobbies: number;
  friends: number;
}

const ProfileStats = ({ posts, lobbies, friends }: Props) => {
  return (
    <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Estadísticas</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{posts}</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Publicaciones</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-x border-white/5">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{lobbies}</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Lobbies</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{friends}</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Amigos</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;