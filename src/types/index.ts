export interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Post {
  id: number;
  user: User;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  created_at: string;
}

export interface Lobby {
  id: number;
  title: string;
  description: string;
  game: string;
  owner: User;
  members: User[];
  max_members: number;
  status: "open" | "full" | "closed";
  created_at: string;
}

export interface Message {
  id: number;
  lobby_id: number;
  user: User;
  content: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: "lobby_invite" | "post_like" | "new_member" | "message";
  message: string;
  read: boolean;
  created_at: string;
}