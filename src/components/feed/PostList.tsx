import PostCard from "./PostCard";

const mockPosts = [
  { id: 1, username: "xSniper99", time: "2h ago", content: "Looking for a squad for ranked tonight 🎮 Need a support main, mic required.", likes: 24, comments: 5 },
  { id: 2, username: "ProGamer_Mia", time: "4h ago", content: "Just hit Diamond in Valorant after 3 months of grind. SquadUp made it so much easier finding good teammates 💜", likes: 87, comments: 12 },
  { id: 3, username: "DarkLord_CS", time: "6h ago", content: "New lobby open for CS2 competitive. Serious players only, mic required. Drop a comment if interested.", likes: 15, comments: 3 },
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