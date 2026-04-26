import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0818] text-white flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center" style={{boxShadow: '0 0 40px rgba(168,85,247,0.4)'}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white"/>
          </svg>
        </div>
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">404</h1>
        <p className="text-gray-400 text-lg">This page doesn't exist in the squad.</p>
        <button onClick={() => navigate("/home")} className="px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;