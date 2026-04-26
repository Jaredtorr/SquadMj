import type { Post } from "../../types";
import PostCard from "./PostCard";

const mockPosts: Post[] = [
  { id: 1, user: { id: 1, username: "xSniper99", email: "", created_at: "2024-01-01" }, content: "Looking for a squad for ranked games tonight, we need a support main 🎮", images: [], likes: 24, comments: 5, created_at: "2024-01-01" },
  { id: 2, user: { id: 2, username: "ProGamer_Mia", email: "", created_at: "2024-01-01" }, content: "Just hit Diamond in Valorant after 3 months of grind. SquadUp made it easier finding good teammates 💜", images: [], likes: 87, comments: 12, created_at: "2024-01-01" },
  { id: 3, user: { id: 3, username: "DarkLord_CS", email: "", created_at: "2024-01-01" }, content: "New lobby open for CS2 competitive. Serious players only, mic required.", images: [], likes: 15, comments: 3, created_at: "2024-01-01" },
];

const PostList = () => {
  return (
    <div className="flex flex-col gap-4">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;