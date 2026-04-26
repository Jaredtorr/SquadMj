const AuthPanel = () => {
  return (
    <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#0d1a4a] to-[#0a0818]"
        style={{clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 80%, 6% 60%, 0% 40%, 6% 20%)"}}
      />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-purple-500/20" />
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full border border-purple-500/10" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-8">
        <svg viewBox="0 0 680 520" className="w-full max-w-[480px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glowBase" cx="50%" cy="75%" r="40%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="padGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#312e6e"/>
              <stop offset="100%" stopColor="#0d0b2e"/>
            </radialGradient>
            <style>{`
              @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
              @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(45deg)} 50%{transform:translateY(-10px) rotate(45deg)} }
              @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
              @keyframes twinkle { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
              .pad { animation: float 4s ease-in-out infinite; transform-origin: 340px 270px; }
              .d1 { animation: floatB 3s ease-in-out infinite; transform-origin: 180px 160px; }
              .d2 { animation: floatB 4s 0.5s ease-in-out infinite; transform-origin: 520px 130px; }
              .d3 { animation: floatB 3.5s 1s ease-in-out infinite; transform-origin: 155px 380px; }
              .d4 { animation: floatB 2.8s 0.8s ease-in-out infinite; transform-origin: 530px 340px; }
              .d5 { animation: floatB 3.2s 0.3s ease-in-out infinite; transform-origin: 420px 420px; }
              .d6 { animation: floatB 4s 1.5s ease-in-out infinite; transform-origin: 240px 420px; }
              .s1 { animation: twinkle 2s ease-in-out infinite; }
              .s2 { animation: twinkle 2.5s 0.5s ease-in-out infinite; }
              .s3 { animation: twinkle 1.8s 1s ease-in-out infinite; }
              .s4 { animation: twinkle 2.2s 0.3s ease-in-out infinite; }
              .s5 { animation: twinkle 3s 1.2s ease-in-out infinite; }
              .glow { animation: pulse 3s ease-in-out infinite; }
            `}</style>
          </defs>

          <ellipse className="glow" cx="340" cy="420" rx="110" ry="22" fill="url(#glowBase)"/>
          <ellipse cx="340" cy="418" rx="80" ry="14" fill="#22d3ee" fillOpacity="0.18"/>
          <ellipse cx="340" cy="416" rx="50" ry="8" fill="#22d3ee" fillOpacity="0.25"/>

          <g className="d1">
            <polygon points="180,130 196,160 180,190 164,160" fill="#a855f7" fillOpacity="0.85"/>
            <polygon points="180,130 196,160 180,160 164,160" fill="#c084fc" fillOpacity="0.5"/>
          </g>
          <g className="d2">
            <rect x="506" y="110" width="28" height="28" rx="4" fill="#38bdf8" fillOpacity="0.8" transform="rotate(20,520,124)"/>
            <rect x="510" y="114" width="28" height="28" rx="4" fill="#0ea5e9" fillOpacity="0.4" transform="rotate(20,524,128)"/>
          </g>
          <g className="d3">
            <polygon points="155,355 171,380 155,405 139,380" fill="#22d3ee" fillOpacity="0.8"/>
            <polygon points="155,355 171,380 155,380 139,380" fill="#67e8f9" fillOpacity="0.4"/>
          </g>
          <g className="d4">
            <polygon points="530,315 546,340 530,365 514,340" fill="#ec4899" fillOpacity="0.75"/>
            <polygon points="530,315 546,340 530,340 514,340" fill="#f472b6" fillOpacity="0.4"/>
          </g>
          <g className="d5">
            <polygon points="420,400 430,418 420,436 410,418" fill="#60a5fa" fillOpacity="0.8"/>
            <polygon points="420,400 430,418 420,418 410,418" fill="#93c5fd" fillOpacity="0.4"/>
          </g>
          <g className="d6">
            <polygon points="240,395 252,415 240,435 228,415" fill="#a78bfa" fillOpacity="0.75"/>
            <polygon points="240,395 252,415 240,415 228,415" fill="#c4b5fd" fillOpacity="0.4"/>
          </g>

          <g className="s1">
            <line x1="290" y1="100" x2="290" y2="116" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
            <line x1="282" y1="108" x2="298" y2="108" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className="s2">
            <line x1="450" y1="155" x2="450" y2="167" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
            <line x1="444" y1="161" x2="456" y2="161" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className="s3">
            <line x1="210" y1="270" x2="210" y2="280" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="205" y1="275" x2="215" y2="275" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <g className="s4">
            <line x1="490" y1="240" x2="490" y2="250" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="485" y1="245" x2="495" y2="245" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          <g className="s5">
            <line x1="360" y1="450" x2="360" y2="460" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="355" y1="455" x2="365" y2="455" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          <circle cx="380" cy="115" r="3" fill="#c084fc" fillOpacity="0.7"/>
          <circle cx="470" cy="310" r="2.5" fill="#38bdf8" fillOpacity="0.6"/>
          <circle cx="220" cy="200" r="2" fill="#f472b6" fillOpacity="0.7"/>
          <circle cx="560" cy="190" r="2" fill="#a78bfa" fillOpacity="0.6"/>
          <circle cx="140" cy="300" r="2.5" fill="#34d399" fillOpacity="0.5"/>

          <g className="pad">
            <path d="M210,230 Q195,215 195,250 L195,320 Q195,360 230,370 L260,375 Q280,380 340,375 Q400,380 420,375 L450,370 Q485,360 485,320 L485,250 Q485,215 470,230 Q455,200 430,195 L380,188 Q360,185 340,185 Q320,185 300,188 L250,195 Q225,200 210,230 Z" fill="url(#padGrad)" stroke="#312e6e" strokeWidth="1.5"/>
            <ellipse cx="230" cy="340" rx="42" ry="52" fill="#1a1750" fillOpacity="0.9"/>
            <ellipse cx="450" cy="340" rx="42" ry="52" fill="#1a1750" fillOpacity="0.9"/>
            <rect x="255" y="270" width="170" height="70" rx="16" fill="#16144a" fillOpacity="0.7"/>
            <rect x="215" y="270" width="16" height="44" rx="4" fill="#0f0e30"/>
            <rect x="207" y="278" width="32" height="16" rx="4" fill="#0f0e30"/>
            <rect x="215" y="270" width="16" height="44" rx="4" fill="#6366f1" fillOpacity="0.15"/>
            <rect x="207" y="278" width="32" height="16" rx="4" fill="#6366f1" fillOpacity="0.15"/>
            <circle cx="440" cy="265" r="9" fill="#0f0e30"/>
            <circle cx="460" cy="283" r="9" fill="#0f0e30"/>
            <circle cx="440" cy="301" r="9" fill="#0f0e30"/>
            <circle cx="420" cy="283" r="9" fill="#0f0e30"/>
            <circle cx="440" cy="265" r="7" fill="#f43f5e" fillOpacity="0.8"/>
            <circle cx="460" cy="283" r="7" fill="#fbbf24" fillOpacity="0.8"/>
            <circle cx="440" cy="301" r="7" fill="#34d399" fillOpacity="0.8"/>
            <circle cx="420" cy="283" r="7" fill="#60a5fa" fillOpacity="0.8"/>
            <circle cx="268" cy="330" r="24" fill="#0a0925"/>
            <circle cx="268" cy="330" r="18" fill="#1e1c50"/>
            <circle cx="268" cy="330" r="12" fill="#312e6e"/>
            <circle cx="264" cy="326" r="4" fill="#6366f1" fillOpacity="0.5"/>
            <circle cx="390" cy="330" r="24" fill="#0a0925"/>
            <circle cx="390" cy="330" r="18" fill="#1e1c50"/>
            <circle cx="390" cy="330" r="12" fill="#312e6e"/>
            <circle cx="386" cy="326" r="4" fill="#6366f1" fillOpacity="0.5"/>
            <rect x="318" y="290" width="14" height="10" rx="5" fill="#312e6e"/>
            <rect x="347" y="290" width="14" height="10" rx="5" fill="#a855f7" fillOpacity="0.8"/>
            <circle cx="340" cy="250" r="12" fill="#1e1c50"/>
            <circle cx="340" cy="250" r="8" fill="#a855f7" fillOpacity="0.6"/>
            <circle cx="340" cy="250" r="4" fill="#c084fc"/>
            <path d="M196,235 Q196,210 225,208 L290,205 L290,225 L220,228 Z" fill="#1a1750" stroke="#312e6e" strokeWidth="1"/>
            <path d="M484,235 Q484,210 455,208 L390,205 L390,225 L460,228 Z" fill="#1a1750" stroke="#312e6e" strokeWidth="1"/>
            <path d="M210,210 Q240,204 285,207" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5"/>
            <path d="M470,210 Q440,204 395,207" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5"/>
          </g>
        </svg>

        <div className="text-center mt-2">
          <h2 className="text-2xl font-black tracking-tight">
            Únete al{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Equipo</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Encuentra tu equipo. Domina el lobby.</p>
        </div>

        <div className="flex gap-6 justify-center mt-6">
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
            <p className="text-xl font-black text-pink-400">98%</p>
            <p className="text-xs text-gray-600 uppercase tracking-widest">Tasa de victorias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;