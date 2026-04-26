import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  // TODO: cuando haya backend, descomentar esto:
  // const token = localStorage.getItem("token");
  // if (!token) return <Navigate to="/" replace />;
  
  // Por ahora deja pasar siempre
  return <>{children}</>;
};

export default PrivateRoute;