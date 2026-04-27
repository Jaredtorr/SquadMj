import type { PostData } from "../../services/postService";
import { BACKEND_URL } from "../../services/authService";

const avatarColors = [
  "linear-gradient(135deg, #7c3aed, #4c1d95)",
  "linear-gradient(135deg, #0ea5e9, #0284c7)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
];

const formatTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)}d`;
};

const getImageUrl = (image_url: string | null | undefined) => {
  if (!image_url) return null;
  if (image_url.startsWith("http")) return image_url;
  return `${BACKEND_URL}/${image_url}`;
};

interface Props {
  post: PostData;
}

const PostCard = ({ post }: Props) => {
  const color = avatarColors[post.user_id % avatarColors.length];
  const imageUrl = getImageUrl(post.image_url);

  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        {getImageUrl(post.user_avatar) ? (
          <img
            src={getImageUrl(post.user_avatar)!}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black text-white"
            style={{ background: color }}
          >
            {post.user_name?.charAt(0).toUpperCase() ?? "?"}
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-white">{post.user_name ?? `Usuario ${post.user_id}`}</p>
          <p className="text-xs" style={{ color: '#6b7280' }}>{formatTime(post.createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      {post.description && (
        <p className="text-sm leading-relaxed px-5 pb-3" style={{ color: '#d1d5db' }}>
          {post.description}
        </p>
      )}

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="post"
          className="w-full object-cover"
          style={{ maxHeight: '400px' }}
        />
      )}

      {/* Footer */}
      <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs" style={{ color: '#4b5563' }}>
          {post.lobby_id ? `Publicado en lobby #${post.lobby_id}` : "Publicación general"}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
