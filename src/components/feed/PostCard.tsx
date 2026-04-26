import { useState } from "react";

interface Props {
  post: {
    id: number;
    username: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
  };
}

const PostCard = ({ post }: Props) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    // TODO: cuando haya backend conectar así:
    // if (liked) {
    //   await fetch(`/api/posts/${post.id}/like`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    // } else {
    //   await fetch(`/api/posts/${post.id}/like`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    // }
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="rounded-2xl p-5 transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)' }} />
        <div>
          <p className="text-sm font-bold text-white">{post.username}</p>
          <p className="text-xs" style={{ color: '#6b7280' }}>{post.time}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#d1d5db' }}>{post.content}</p>
      <div className="flex items-center gap-5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-xs transition-all"
          style={{ color: liked ? '#f472b6' : '#6b7280' }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={liked ? '#f472b6' : 'none'}
            style={{ transition: 'all 0.2s', transform: liked ? 'scale(1.2)' : 'scale(1)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likesCount}
        </button>

        {/* Comments button — TODO: abrir modal de comentarios cuando haya backend */}
        <button
          className="flex items-center gap-1.5 text-xs transition-all hover:text-white"
          style={{ color: '#6b7280' }}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comments}
        </button>

      </div>
    </div>
  );
};

export default PostCard;