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
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas — TODO: activar PrivateRoute cuando haya backend */}
      {/* Por ahora dejan pasar sin validar token */}
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/lobbies" element={<PrivateRoute><LobbyList /></PrivateRoute>} />
      <Route path="/lobbies/:id" element={<PrivateRoute><LobbyDetail /></PrivateRoute>} />
      <Route path="/lobbies/create" element={<PrivateRoute><CreateLobby /></PrivateRoute>} />
      <Route path="/profile/:username" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
      <Route path="/post/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;