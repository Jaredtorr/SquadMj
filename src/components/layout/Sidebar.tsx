import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { label: "Home", path: "/home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Lobbies", path: "/lobbies", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Create Post", path: "/post/create", icon: "M12 4v16m8-8H4" },
  { label: "Create Lobby", path: "/lobbies/create", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Profile", path: "/profile/me", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-[#0a0818] border-r border-white/5 flex flex-col py-6 px-4 gap-1">
      {links.map((link) => {
        const active = location.pathname === link.path;
        return (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              active
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            {link.label}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;