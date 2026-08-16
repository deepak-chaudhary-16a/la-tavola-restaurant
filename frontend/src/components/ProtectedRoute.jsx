import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-[50vh] flex items-center justify-center text-muted">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const RequireAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-[50vh] flex items-center justify-center text-muted">Loading...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};
