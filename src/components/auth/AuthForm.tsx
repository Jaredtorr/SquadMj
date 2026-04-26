import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center px-10 relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-700 opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center" style={{boxShadow: '0 0 14px rgba(168,85,247,0.7), 0 0 28px rgba(168,85,247,0.3)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-widest uppercase text-purple-300">SquadUp</span>
        </div>
        <h1 className="text-5xl font-black mb-2 leading-none">
          Bienvenido<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">de nuevo.</span>
        </h1>
        <p className="text-gray-500 mb-10 text-sm tracking-wide">Inicia sesión en tu cuenta y únete al equipo.</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@squadup.gg" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all" />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all" />
          </div>
          <div className="flex justify-end">
            <span className="text-xs text-purple-400 cursor-pointer hover:text-purple-300 transition">¿Olvidaste tu contraseña?</span>
          </div>
          <button className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/40">Iniciar sesión</button>
          <button className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-gray-400">Jugar como invitado</button>
        </div>
        <p className="mt-8 text-gray-500 text-sm text-center">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:text-purple-300 transition font-semibold bg-transparent border-none cursor-pointer p-0"
          >
            Crear una
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;