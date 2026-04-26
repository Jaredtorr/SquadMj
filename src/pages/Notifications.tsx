import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import type { Notification } from "../types";

const mockNotifications: Notification[] = [
  { id: 1, user_id: 1, type: "lobby_invite", message: "xSniper99 invited you to join Ranked Squad", read: false, created_at: "2024-01-01" },
  { id: 2, user_id: 1, type: "post_like", message: "ProGamer_Mia liked your post", read: false, created_at: "2024-01-01" },
  { id: 3, user_id: 1, type: "new_member", message: "DarkLord_CS joined your lobby", read: true, created_at: "2024-01-01" },
  { id: 4, user_id: 1, type: "message", message: "New message in Ranked Squad", read: true, created_at: "2024-01-01" },
];

const iconMap = {
  lobby_invite: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  post_like: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  new_member: "M12 4v16m8-8H4",
  message: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
};

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <main className="ml-60 pt-16 min-h-screen">
        <div className="max-w-xl mx-auto py-8 px-4 flex flex-col gap-4">
          <h1 className="text-3xl font-black uppercase tracking-widest">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Notifications</span>
          </h1>
          <div className="flex flex-col gap-3">
            {mockNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? "bg-white/5 border-white/5"
                    : "bg-purple-500/5 border-purple-500/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? "bg-white/10" : "bg-purple-500/20"}`}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={notif.read ? "text-gray-500" : "text-purple-400"}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconMap[notif.type]} />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${notif.read ? "text-gray-400" : "text-white font-semibold"}`}>{notif.message}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{new Date(notif.created_at).toLocaleDateString()}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;