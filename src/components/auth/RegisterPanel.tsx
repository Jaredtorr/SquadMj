const RegisterPanel = () => {
  return (
    <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#0d1a4a] to-[#0a0818]"
        style={{clipPath:"polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 80%, 6% 60%, 0% 40%, 6% 20%)"}}
      />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-purple-500/20" />
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full border border-purple-500/10" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-8">
        <svg viewBox="0 0 500 300" className="w-full max-w-[480px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#38bdf8"/>
            </linearGradient>
            <style>{`
              @keyframes glitch1 {
                0%,100%{transform:translate(0,0) skewX(0deg)}
                20%{transform:translate(-3px,0) skewX(-2deg)}
                40%{transform:translate(3px,0) skewX(2deg)}
                60%{transform:translate(-2px,0) skewX(0deg)}
                80%{transform:translate(2px,0) skewX(-1deg)}
              }
              @keyframes glitch2 {
                0%,100%{transform:translate(0,0);opacity:0}
                20%{transform:translate(4px,0);opacity:0.6}
                40%{transform:translate(-4px,0);opacity:0.4}
                60%{transform:translate(3px,0);opacity:0.5}
                80%{transform:translate(0,0);opacity:0}
              }
              @keyframes glitch3 {
                0%,100%{transform:translate(0,0);opacity:0}
                25%{transform:translate(-4px,0);opacity:0.5}
                50%{transform:translate(4px,0);opacity:0.3}
                75%{transform:translate(-2px,0);opacity:0.4}
              }
              @keyframes pulse {
                0%,100%{opacity:0.4;transform:scale(1)}
                50%{opacity:1;transform:scale(1.05)}
              }
              @keyframes floatB {
                0%,100%{transform:translateY(0px) rotate(45deg)}
                50%{transform:translateY(-10px) rotate(45deg)}
              }
              @keyframes twinkle {
                0%,100%{opacity:0.2;transform:scale(0.8)}
                50%{opacity:1;transform:scale(1.2)}
              }
              @keyframes scanline {
                0%{transform:translateY(-100%)}
                100%{transform:translateY(400%)}
              }
              .main-text { animation: glitch1 3s ease-in-out infinite; }
              .glitch-r { animation: glitch2 3s ease-in-out infinite; }
              .glitch-b { animation: glitch3 3s ease-in-out infinite; }
              .glow-pulse { animation: pulse 2s ease-in-out infinite; }
              .dd1 { animation: floatB 3s ease-in-out infinite; }
              .dd2 { animation: floatB 4s 0.5s ease-in-out infinite; }
              .dd3 { animation: floatB 3.5s 1s ease-in-out infinite; }
              .ss1 { animation: twinkle 2s ease-in-out infinite; }
              .ss2 { animation: twinkle 2.5s 0.5s ease-in-out infinite; }
              .ss3 { animation: twinkle 1.8s 1.2s ease-in-out infinite; }
              .scan { animation: scanline 4s linear infinite; }
            `}</style>
          </defs>

          <ellipse className="glow-pulse" cx="250" cy="150" rx="180" ry="60" fill="#7c3aed" fillOpacity="0.15"/>
          <rect className="scan" x="0" y="0" width="500" height="6" fill="#a855f7" fillOpacity="0.08"/>

          <text className="glitch-r" x="250" y="120" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#f43f5e" fillOpacity="0.7" letterSpacing="2">ÚNETE</text>
          <text className="glitch-b" x="250" y="120" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#38bdf8" fillOpacity="0.7" letterSpacing="2">ÚNETE</text>
          <text className="main-text" x="250" y="120" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="system-ui, sans-serif" fill="white" letterSpacing="2">ÚNETE</text>

          <text className="glitch-r" x="250" y="185" textAnchor="middle" fontSize="38" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#f43f5e" fillOpacity="0.7" letterSpacing="4">AL SQUAD</text>
          <text className="glitch-b" x="250" y="185" textAnchor="middle" fontSize="38" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#38bdf8" fillOpacity="0.7" letterSpacing="4">AL SQUAD</text>
          <text className="main-text" x="250" y="185" textAnchor="middle" fontSize="38" fontWeight="900" fontFamily="system-ui, sans-serif" fill="url(#grad1)" letterSpacing="4">AL SQUAD</text>

          <rect x="100" y="200" width="300" height="2" rx="1" fill="url(#grad1)" fillOpacity="0.6"/>
          <text x="250" y="235" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280" letterSpacing="6">EMPIEZA AHORA</text>

          <g className="dd1">
            <polygon points="60,60 72,80 60,100 48,80" fill="#a855f7" fillOpacity="0.8"/>
            <polygon points="60,60 72,80 60,80 48,80" fill="#c084fc" fillOpacity="0.4"/>
          </g>
          <g className="dd2">
            <polygon points="440,180 452,200 440,220 428,200" fill="#ec4899" fillOpacity="0.75"/>
            <polygon points="440,180 452,200 440,200 428,200" fill="#f472b6" fillOpacity="0.4"/>
          </g>
          <g className="dd3">
            <rect x="420" y="50" width="20" height="20" rx="3" fill="#38bdf8" fillOpacity="0.7" transform="rotate(20,430,60)"/>
          </g>

          <g className="ss1">
            <line x1="90" y1="190" x2="90" y2="202" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="84" y1="196" x2="96" y2="196" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <g className="ss2">
            <line x1="420" y1="100" x2="420" y2="110" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="415" y1="105" x2="425" y2="105" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <g className="ss3">
            <line x1="130" y1="240" x2="130" y2="250" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="125" y1="245" x2="135" y2="245" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          <circle cx="70" cy="200" r="2" fill="#34d399" fillOpacity="0.6"/>
          <circle cx="450" cy="130" r="2" fill="#f472b6" fillOpacity="0.6"/>
          <circle cx="160" cy="50" r="2" fill="#38bdf8" fillOpacity="0.6"/>
        </svg>

        <div className="flex gap-6 justify-center mt-4">
          <div className="text-center">
            <p className="text-xl font-black text-purple-400">12K+</p>
            <p className="text-xs text-gray-600 uppercase tracking-widest">Jugadores</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-black text-blue-400">340+</p>
            <p className="text-xs text-gray-600 uppercase tracking-widest">Lobbies</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-black text-pink-400">Gratis</p>
            <p className="text-xs text-gray-600 uppercase tracking-widest">Siempre</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPanel;