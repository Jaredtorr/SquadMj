import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import LobbyList from "../pages/LobbyList";
import LobbyDetail from "../pages/LobbyDetail";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import CreateLobby from "../pages/CreateLobby";
import CreatePost from "../pages/CreatePost";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/lobbies" element={<LobbyList />} />
      <Route path="/lobbies/:id" element={<LobbyDetail />} />
      <Route path="/lobbies/create" element={<CreateLobby />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/post/create" element={<CreatePost />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;