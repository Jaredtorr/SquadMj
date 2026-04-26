import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">

        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

        {/* Número 404 pixel art gigante */}
        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* 404 */}
          <div className="relative">
            <h1
              className="font-black text-center select-none"
              style={{
                fontSize: '160px',
                lineHeight: '1',
                fontFamily: 'Orbitron, sans-serif',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(180deg, #a78bfa 0%, #4c1d95 100%)',
                backgroundClip: 'text',
                textShadow: 'none',
                opacity: 0.15,
              }}
            >
              404
            </h1>
            {/* Muñequito pixel art encima del 404 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{ animation: 'float404 3s ease-in-out infinite' }}>
                <svg width="80" height="100" viewBox="0 0 40 50" style={{ imageRendering: 'pixelated' }}>
                  {/* Signo de interrogación flotando */}
                  <rect x="17" y="0" width="4" height="6" fill="#fcd34d" style={{ animation: 'questionPulse 1s steps(2) infinite' }} />
                  <rect x="15" y="6" width="8" height="3" fill="#fcd34d" style={{ animation: 'questionPulse 1s steps(2) infinite' }} />
                  <rect x="13" y="9" width="4" height="3" fill="#fcd34d" />
                  <rect x="17" y="12" width="4" height="4" fill="#fcd34d" />
                  <rect x="17" y="18" width="4" height="4" fill="#fcd34d" />
                  {/* Cabeza */}
                  <rect x="14" y="24" width="12" height="10" fill="#a78bfa" />
                  <rect x="16" y="27" width="2" height="2" fill="#0d0820" />
                  <rect x="22" y="27" width="2" height="2" fill="#0d0820" />
                  {/* Boca confundida */}
                  <rect x="17" y="31" width="6" height="1" fill="#0d0820" />
                  <rect x="16" y="30" width="2" height="1" fill="#0d0820" />
                  <rect x="22" y="30" width="2" height="1" fill="#0d0820" />
                  {/* Cuerpo */}
                  <rect x="12" y="34" width="16" height="10" fill="#7c3aed" />
                  <rect x="14" y="35" width="12" height="8" fill="#6d28d9" />
                  {/* Brazos levantados confundido */}
                  <rect x="4" y="30" width="8" height="4" fill="#7c3aed" style={{ animation: 'armShrug 1s ease-in-out infinite alternate' }} />
                  <rect x="28" y="30" width="8" height="4" fill="#7c3aed" style={{ animation: 'armShrug 1s ease-in-out infinite alternate-reverse' }} />
                  {/* Manos */}
                  <rect x="2" y="27" width="4" height="4" fill="#a78bfa" />
                  <rect x="34" y="27" width="4" height="4" fill="#a78bfa" />
                  {/* Piernas */}
                  <rect x="14" y="44" width="5" height="5" fill="#4c1d95" />
                  <rect x="21" y="44" width="5" height="5" fill="#4c1d95" />
                  {/* Zapatos */}
                  <rect x="12" y="48" width="7" height="2" fill="#2e1065" />
                  <rect x="21" y="48" width="7" height="2" fill="#2e1065" />
                </svg>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#7c3aed', fontFamily: 'Orbitron, sans-serif' }}>Error 404</p>
            <h2 className="text-3xl font-black mb-3">
              Página{" "}
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)', backgroundClip: 'text' }}>
                no encontrada
              </span>
            </h2>
            <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
              Parece que este lobby no existe o fue eliminado.
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
              style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)', fontFamily: 'Orbitron, sans-serif' }}
            >
              ← Volver
            </button>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 20px rgba(124,58,237,0.3)', fontFamily: 'Orbitron, sans-serif' }}
            >
              Ir al inicio
            </button>
          </div>

          {/* Muñequitos corriendo en la base */}
          <div className="relative w-96 overflow-hidden" style={{ height: '50px' }}>
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'rgba(124,58,237,0.3)' }} />
            <div className="absolute" style={{ bottom: '1px', animation: 'runRight 5s linear infinite' }}>
              <svg width="28" height="40" viewBox="0 0 14 20" style={{ imageRendering: 'pixelated' }}>
                <rect x="4" y="0" width="6" height="6" fill="#a78bfa" />
                <rect x="3" y="6" width="8" height="6" fill="#7c3aed" />
                <rect x="3" y="12" width="3" height="5" fill="#4c1d95" style={{ animation: 'legRunL 0.2s steps(2) infinite' }} />
                <rect x="8" y="12" width="3" height="5" fill="#4c1d95" style={{ animation: 'legRunR 0.2s steps(2) infinite' }} />
                <rect x="5" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="8" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '1px', animation: 'runLeft 6s linear infinite', animationDelay: '2s' }}>
              <svg width="28" height="40" viewBox="0 0 14 20" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
                <rect x="4" y="0" width="6" height="6" fill="#60a5fa" />
                <rect x="3" y="6" width="8" height="6" fill="#2563eb" />
                <rect x="3" y="12" width="3" height="5" fill="#1d4ed8" style={{ animation: 'legRunL 0.2s steps(2) infinite' }} />
                <rect x="8" y="12" width="3" height="5" fill="#1d4ed8" style={{ animation: 'legRunR 0.2s steps(2) infinite' }} />
                <rect x="5" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="8" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
            <div className="absolute" style={{ bottom: '1px', left: '45%', animation: 'jump 2s ease-in-out infinite', animationDelay: '1s' }}>
              <svg width="28" height="40" viewBox="0 0 14 20" style={{ imageRendering: 'pixelated' }}>
                <rect x="4" y="0" width="6" height="6" fill="#f472b6" />
                <rect x="3" y="6" width="8" height="6" fill="#db2777" />
                <rect x="3" y="12" width="3" height="5" fill="#9d174d" />
                <rect x="8" y="12" width="3" height="5" fill="#9d174d" />
                <rect x="5" y="2" width="1" height="1" fill="#0d0820" />
                <rect x="8" y="2" width="1" height="1" fill="#0d0820" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float404 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes questionPulse {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        @keyframes armShrug {
          from { transform: rotate(-15deg); transform-origin: right center; }
          to { transform: rotate(15deg); transform-origin: right center; }
        }
        @keyframes runRight { from { left: -40px; } to { left: 100%; } }
        @keyframes runLeft { from { right: -40px; left: auto; } to { right: 100%; left: auto; } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        @keyframes legRunL { 0% { transform: translateY(0); } 100% { transform: translateY(3px); } }
        @keyframes legRunR { 0% { transform: translateY(3px); } 100% { transform: translateY(0); } }
      `}</style>
    </MainLayout>
  );
};

export default NotFound;