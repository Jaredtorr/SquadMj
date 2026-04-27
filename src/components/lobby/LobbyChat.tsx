import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { getUser } from "../../services/authService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface Message {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  sentAt: string;
}

interface Props {
  lobbyId: number;
  lobbyName: string;
  lobbyGame: string;
}

const avatarColors = [
  "linear-gradient(135deg, #7c3aed, #4c1d95)",
  "linear-gradient(135deg, #0ea5e9, #0284c7)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
  "linear-gradient(135deg, #ec4899, #db2777)",
];

const getAvatarColor = (userId: number) => avatarColors[userId % avatarColors.length];

const LobbyChat = ({ lobbyId, lobbyName, lobbyGame }: Props) => {
  const currentUser = getUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let socket: Socket;

    const connect = () => {
      // La cookie HttpOnly access_token viaja automáticamente con withCredentials
      socket = io(BACKEND_URL, { withCredentials: true });
      socketRef.current = socket;

      socket.on("connect", () => {
        setConnected(true);
        socket.emit("join_lobby", lobbyId);
      });

      socket.on("disconnect", () => setConnected(false));

      socket.on("message_history", (history: Message[]) => {
        setMessages(history);
        history.forEach((msg, i) => {
          setTimeout(() => {
            setVisible((prev) => new Set(prev).add(msg.id));
          }, i * 80);
        });
      });

      socket.on("new_message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => setVisible((prev) => new Set(prev).add(msg.id)), 30);
      });

      socket.on("error", (err: { message: string }) => {
        console.error("Socket error:", err.message);
      });
    };

    // Refrescar token antes de conectar para que no expire en medio de la sesión
    fetch(`${API_URL}/auth/refresh`, { method: "POST", credentials: "include" })
      .finally(() => connect());

    return () => {
      if (socket) {
        socket.emit("leave_lobby", lobbyId);
        socket.disconnect();
      }
    };
  }, [lobbyId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.emit("send_message", { lobby_id: lobbyId, content: input.trim() });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 flex-shrink-0" style={{ background: 'linear-gradient(120deg, #0d0820, #1a0a3a)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: connected ? '#4ade80' : '#6b7280', boxShadow: connected ? '0 0 6px #4ade80' : 'none' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Squad Chat</span>
        </div>
        <p className="text-xs" style={{ color: '#6b7280' }}>{lobbyName} · {lobbyGame}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && connected && (
          <p className="text-xs text-center mt-8" style={{ color: '#4b5563' }}>Sin mensajes aún. ¡Di algo!</p>
        )}

        {messages.map((msg) => {
          const isMe = msg.user_id === currentUser?.id;
          const isVis = visible.has(msg.id);
          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}
              style={{
                opacity: isVis ? 1 : 0,
                transform: isVis ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {!isMe && (
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 mt-1 flex items-center justify-center text-xs font-black text-white"
                  style={{ background: getAvatarColor(msg.user_id) }}
                >
                  {msg.user_name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`flex flex-col gap-0.5 max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>{msg.user_name}</span>
                )}
                <div
                  className="px-3 py-2 text-sm"
                  style={{
                    background: isMe ? 'linear-gradient(135deg, #7c3aed, #4c1d95)' : 'rgba(255,255,255,0.06)',
                    color: isMe ? '#fff' : '#d1d5db',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  }}
                >
                  {msg.content}
                </div>
                <span className="text-xs" style={{ color: '#4b5563' }}>
                  {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex gap-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje..."
          disabled={!connected}
          className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all disabled:opacity-50"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <button
          onClick={handleSend}
          disabled={!connected || !input.trim()}
          className="px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 0 12px rgba(124,58,237,0.3)' }}
        >
          Enviar
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default LobbyChat;
