import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Inicio", path: "/home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Lobbies", path: "/lobbies", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Crear publicación", path: "/post/create", icon: "M12 4v16m8-8H4" },
  { label: "Crear lobby", path: "/lobbies/create", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Notificaciones", path: "/notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { label: "Perfil", path: "/profile/me", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen text-white flex" style={{ background: 'linear-gradient(135deg, #06040F 0%, #0d0820 50%, #06040F 100%)' }}>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col py-8 px-5 z-40" style={{ background: 'rgba(10,5,25,0.97)', borderRight: '1px solid rgba(124,58,237,0.12)' }}>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 16px rgba(124,58,237,0.5)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#a78bfa' }}>SquadUp</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={{
                  background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: isActive ? '#c4b5fd' : '#6b7280',
                  border: isActive ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                }}
              >
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={link.icon} />
                </svg>
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left mb-3"
          style={{ color: '#f87171', border: '1px solid transparent' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)';
            (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(239,68,68,0.2)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.border = '1px solid transparent';
          }}
        >
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>

        {/* Usuario */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(124,58,237,0.12)' }}>
          <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
          <div>
            <p className="text-xs font-semibold text-white">xSniper99</p>
            <p className="text-xs" style={{ color: '#6b7280' }}>En línea</p>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="ml-56 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;