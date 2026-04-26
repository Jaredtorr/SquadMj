import { useState, useEffect, useRef } from "react";

const userColors: Record<string, string> = {
  xSniper99: "linear-gradient(135deg, #7c3aed, #4c1d95)",
  ProGamer_Mia: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  DarkLord_CS: "linear-gradient(135deg, #f59e0b, #d97706)",
  Me: "linear-gradient(135deg, #10b981, #059669)",
};

const getColor = (username: string) => userColors[username] || "linear-gradient(135deg, #7c3aed, #4c1d95)";

const mockMessages = [
  { id: 1, username: "xSniper99", content: "¡Hola a todos, listos para jugar?", time: "7:30 PM" },
  { id: 2, username: "ProGamer_Mia", content: "¡Vamos! Calentando motores 🎮", time: "7:31 PM" },
  { id: 3, username: "DarkLord_CS", content: "Denme 5 mins, casi estoy listo", time: "7:32 PM" },
];

const LobbyChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, msg.id]);
      }, i * 120);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      username: "Me",
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setTimeout(() => setVisible((prev) => [...prev, newMsg.id]), 50);
    setInput("");

    // Simulate someone typing back
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: Date.now() + 1,
        username: "xSniper99",
        content: "👍",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => setVisible((prev) => [...prev, reply.id]), 50);
    }, 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {}, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Banner */}
      <div className="px-4 py-3 flex-shrink-0" style={{ background: 'linear-gradient(120deg, #0d0820, #1a0a3a)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Squad Chat</span>
        </div>
        <p className="text-xs" style={{ color: '#6b7280' }}>Ranked Squad · Valorant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => {
          const isMe = msg.username === "Me";
          const isVis = visible.includes(msg.id);
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
                <div className="w-7 h-7 rounded-full flex-shrink-0 mt-1" style={{ background: getColor(msg.username) }} />
              )}
              <div className={`flex flex-col gap-0.5 max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>{msg.username}</span>}
                <div
                  className="px-3 py-2 rounded-2xl text-sm"
                  style={{
                    background: isMe ? 'linear-gradient(135deg, #7c3aed, #4c1d95)' : 'rgba(255,255,255,0.06)',
                    color: isMe ? '#fff' : '#d1d5db',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  }}
                >
                  {msg.content}
                </div>
                <span className="text-xs" style={{ color: '#4b5563' }}>{msg.time}</span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: getColor("xSniper99") }} />
            <div className="px-3 py-2 rounded-2xl flex gap-1 items-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#6b7280',
                    animation: 'bounce 1s infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex gap-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
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