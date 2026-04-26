import { useNavigate } from "react-router-dom";
import LobbyChat from "../components/lobby/LobbyChat";

const mockLobby = {
  id: 1,
  title: "Ranked Squad",
  description: "Buscamos jugadores serios para partidas ranked. Se requiere micrófono y buena actitud.",
  game: "Valorant",
  status: "open",
  max_members: 5,
  members: [
    { id: 1, username: "xSniper99" },
    { id: 2, username: "ProGamer_Mia" },
    { id: 3, username: "DarkLord_CS" },
  ],
  owner: { id: 1, username: "xSniper99" },
  requirements: "Diamante+, Micrófono requerido, Solo español",
};

const statusLabel: Record<string, string> = {
  open: "Abierto",
  full: "Lleno",
};

const CrossedSwordsSVG = () => (
  <svg width="180" height="130" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="blade-l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e2d9f3" />
        <stop offset="45%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="blade-r" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e2d9f3" />
        <stop offset="45%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="handle-l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4c1d95" />
        <stop offset="100%" stopColor="#1e1040" />
      </linearGradient>
      <linearGradient id="handle-r" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4c1d95" />
        <stop offset="100%" stopColor="#1e1040" />
      </linearGradient>
      <linearGradient id="crown-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <filter id="glow-f" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <style>{`
        @keyframes sw-ring1  { 0%,100%{r:38;opacity:.18} 50%{r:46;opacity:.06} }
        @keyframes sw-ring2  { 0%,100%{r:54;opacity:.09} 50%{r:62;opacity:.03} }
        @keyframes sw-sl     { 0%,100%{opacity:.85} 50%{opacity:1} }
        @keyframes sw-sr     { 0%,100%{opacity:.85} 50%{opacity:1} }
        @keyframes sw-sp1    { 0%{cx:340;cy:248;opacity:1;r:2.5} 100%{cx:310;cy:215;opacity:0;r:0} }
        @keyframes sw-sp2    { 0%{cx:340;cy:248;opacity:1;r:2}   100%{cx:368;cy:212;opacity:0;r:0} }
        @keyframes sw-sp3    { 0%{cx:340;cy:248;opacity:1;r:1.8} 100%{cx:325;cy:200;opacity:0;r:0} }
        @keyframes sw-sp4    { 0%{cx:340;cy:248;opacity:1;r:1.5} 100%{cx:355;cy:202;opacity:0;r:0} }
        @keyframes sw-sp5    { 0%{cx:340;cy:248;opacity:1;r:1.2} 100%{cx:295;cy:230;opacity:0;r:0} }
        @keyframes sw-sp6    { 0%{cx:340;cy:248;opacity:1;r:1.2} 100%{cx:385;cy:228;opacity:0;r:0} }
        @keyframes sw-clash  { 0%,100%{opacity:.55;r:16} 50%{opacity:.9;r:22} }
        @keyframes sw-crown  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
        @keyframes sw-shinel { 0%,100%{opacity:0} 40%,60%{opacity:.7} }
        @keyframes sw-shiner { 0%,100%{opacity:0} 45%,65%{opacity:.7} }
        @media (prefers-reduced-motion: no-preference) {
          .sw-r1  { animation: sw-ring1 2.8s ease-in-out infinite; }
          .sw-r2  { animation: sw-ring2 2.8s ease-in-out infinite; }
          .sw-sl  { animation: sw-sl 2.8s ease-in-out infinite; }
          .sw-sr  { animation: sw-sr 2.8s ease-in-out infinite .4s; }
          .sw-p1  { animation: sw-sp1 1.4s ease-out infinite; }
          .sw-p2  { animation: sw-sp2 1.4s ease-out infinite .2s; }
          .sw-p3  { animation: sw-sp3 1.4s ease-out infinite .5s; }
          .sw-p4  { animation: sw-sp4 1.4s ease-out infinite .7s; }
          .sw-p5  { animation: sw-sp5 1.4s ease-out infinite .35s; }
          .sw-p6  { animation: sw-sp6 1.4s ease-out infinite .9s; }
          .sw-cl  { animation: sw-clash 1.4s ease-in-out infinite; }
          .sw-cr  { animation: sw-crown 3s ease-in-out infinite; transform-origin: 340px 155px; }
          .sw-shl { animation: sw-shinel 2.8s ease-in-out infinite; }
          .sw-shr { animation: sw-shiner 2.8s ease-in-out infinite .4s; }
        }
      `}</style>
    </defs>

    <circle className="sw-r2" cx="340" cy="250" r="54" fill="none" stroke="#7c3aed" strokeWidth="1" opacity=".09" />
    <circle className="sw-r1" cx="340" cy="250" r="38" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity=".18" />
    <circle cx="340" cy="248" r="28" fill="#7c3aed" opacity=".06" filter="url(#soft-glow)" />
    <circle className="sw-cl" cx="340" cy="248" r="16" fill="#fbbf24" opacity=".55" filter="url(#soft-glow)" />

    <g className="sw-sl" opacity=".9">
      <polygon points="340,248 199,138 191,148" fill="url(#blade-l)" />
      <line x1="338" y1="246" x2="196" y2="142" stroke="#e9d5ff" strokeWidth=".7" opacity=".6" />
      <g transform="rotate(-40,340,248)">
        <rect x="307" y="243" width="48" height="10" rx="3" fill="url(#handle-l)" stroke="#6d28d9" strokeWidth=".8" />
        <rect x="323" y="248" width="16" height="34" rx="3" fill="url(#handle-l)" stroke="#6d28d9" strokeWidth=".8" />
        <circle cx="331" cy="283" r="6" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="331" cy="283" r="3" fill="#7c3aed" />
      </g>
      <line className="sw-shl" x1="240" y1="175" x2="330" y2="242" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0" />
    </g>

    <g className="sw-sr" opacity=".9">
      <polygon points="340,248 481,138 489,148" fill="url(#blade-r)" />
      <line x1="342" y1="246" x2="484" y2="142" stroke="#e9d5ff" strokeWidth=".7" opacity=".6" />
      <g transform="rotate(40,340,248)">
        <rect x="325" y="243" width="48" height="10" rx="3" fill="url(#handle-r)" stroke="#6d28d9" strokeWidth=".8" />
        <rect x="341" y="248" width="16" height="34" rx="3" fill="url(#handle-r)" stroke="#6d28d9" strokeWidth=".8" />
        <circle cx="349" cy="283" r="6" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="349" cy="283" r="3" fill="#7c3aed" />
      </g>
      <line className="sw-shr" x1="440" y1="175" x2="350" y2="242" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0" />
    </g>

    <circle className="sw-p1" cx="340" cy="248" r="2.5" fill="#fbbf24" />
    <circle className="sw-p2" cx="340" cy="248" r="2"   fill="#fde68a" />
    <circle className="sw-p3" cx="340" cy="248" r="1.8" fill="#fff" />
    <circle className="sw-p4" cx="340" cy="248" r="1.5" fill="#fbbf24" />
    <circle className="sw-p5" cx="340" cy="248" r="1.2" fill="#fde68a" />
    <circle className="sw-p6" cx="340" cy="248" r="1.2" fill="#c4b5fd" />

    <g className="sw-cr">
      <polygon points="295,178 305,148 320,165 340,138 360,165 375,148 385,178" fill="url(#crown-grad)" stroke="#fbbf24" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="295" y="178" width="90" height="16" rx="4" fill="url(#crown-grad)" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="340" cy="145" r="4.5" fill="#fbbf24" filter="url(#glow-f)" />
      <circle cx="305" cy="155" r="3" fill="#fbbf24" opacity=".8" />
      <circle cx="375" cy="155" r="3" fill="#fbbf24" opacity=".8" />
      <circle cx="340" cy="186" r="3" fill="#b45309" />
      <circle cx="318" cy="186" r="2.5" fill="#b45309" />
      <circle cx="362" cy="186" r="2.5" fill="#b45309" />
    </g>
  </svg>
);

const LobbyDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white flex" style={{ background: "linear-gradient(135deg, #06040F 0%, #0d0820 50%, #06040F 100%)" }}>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col py-8 px-5 z-40" style={{ background: "rgba(10,5,25,0.97)", borderRight: "1px solid rgba(124,58,237,0.12)" }}>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 16px rgba(124,58,237,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#a78bfa" }}>SquadUp</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { label: "Inicio",            path: "/home",           icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { label: "Lobbies",           path: "/lobbies",        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            { label: "Crear publicación", path: "/post/create",    icon: "M12 4v16m8-8H4" },
            { label: "Crear lobby",       path: "/lobbies/create", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Notificaciones",    path: "/notifications",  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
            { label: "Perfil",            path: "/profile/me",     icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
          ].map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
              style={{
                color:      link.path === "/lobbies" ? "#a78bfa" : "#6b7280",
                background: link.path === "/lobbies" ? "rgba(124,58,237,0.1)" : "transparent",
              }}
            >
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={link.icon} />
              </svg>
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(124,58,237,0.12)" }}>
          <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }} />
          <div>
            <p className="text-xs font-semibold text-white">xSniper99</p>
            <p className="text-xs" style={{ color: "#6b7280" }}>En línea</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 flex flex-col" style={{ height: "100vh", overflow: "hidden" }}>

        {/* Header */}
        <div
          className="relative px-8 py-5 flex items-center justify-between flex-shrink-0 overflow-hidden"
          style={{ background: "linear-gradient(120deg, #0d0820 0%, #1a0a3a 50%, #0d0820 100%)", borderBottom: "1px solid rgba(124,58,237,0.15)", minHeight: "100px" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />

          {/* SVG animado — derecha con fade */}
          <div
            className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none"
            style={{
              maskImage: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <CrossedSwordsSVG />
          </div>

          <div className="relative z-10 flex flex-col gap-1">
            <button
              onClick={() => navigate("/lobbies")}
              className="flex items-center gap-1.5 text-xs mb-1 w-fit transition-all"
              style={{ color: "#6b7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Lobbies
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>{mockLobby.game}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>
                {statusLabel[mockLobby.status] ?? mockLobby.status}
              </span>
            </div>
            <h1 className="text-2xl font-black">{mockLobby.title}</h1>
          </div>

          <button
            className="relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 20px rgba(124,58,237,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.35)"; }}
          >
            Unirse al Lobby
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left — Info */}
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Acerca de</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#d1d5db" }}>{mockLobby.description}</p>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Requisitos</h3>
              <div className="flex flex-wrap gap-2">
                {mockLobby.requirements.split(", ").map((req) => (
                  <span key={req} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.2)" }}>
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>Miembros</h3>
                <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>{mockLobby.members.length}/{mockLobby.max_members}</span>
              </div>
              <div className="h-1 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-1 rounded-full" style={{ width: `${(mockLobby.members.length / mockLobby.max_members) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #60a5fa)" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockLobby.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }} />
                    <div>
                      <p className="text-sm font-bold text-white">{member.username}</p>
                      {member.id === mockLobby.owner.id && (
                        <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>Líder</span>
                      )}
                    </div>
                  </div>
                ))}
                {Array.from({ length: mockLobby.max_members - mockLobby.members.length }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => console.log("join slot")}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all w-full text-left"
                    style={{ background: "rgba(124,58,237,0.05)", border: "1px dashed rgba(124,58,237,0.25)" }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: "1px dashed rgba(124,58,237,0.4)" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#7c3aed" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: "#7c3aed" }}>Unirse</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Chat */}
          <div className="w-96 flex-shrink-0 flex flex-col" style={{ borderLeft: "1px solid rgba(124,58,237,0.08)", height: "100%" }}>
            <LobbyChat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LobbyDetail;