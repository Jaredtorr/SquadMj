import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightPanel from "../components/layout/RightPanel";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import PostList from "../components/feed/PostList";

const mockUser = {
  id: 1,
  username: "xSniper99",
  email: "sniper@squadup.gg",
  bio: "Competitive gamer. Valorant Diamond. Always looking for a good squad 💜",
  avatar_url: "",
  created_at: "2024-01-01",
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0a0818] text-white">
      <Navbar />
      <Sidebar />
      <RightPanel />
      <main className="ml-60 mr-60 pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-4">
          <ProfileHeader user={mockUser} />
          <ProfileStats posts={12} lobbies={5} friends={38} />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">Posts</h2>
          <PostList />
        </div>
      </main>
    </div>
  );
};

export default Profile;