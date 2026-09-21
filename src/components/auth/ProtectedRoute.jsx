import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from '../../constants/routes'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-[#0A2A6B] border-t-transparent rounded-full" />
    </div>
  )

  if (!user) {
    // remember where the user was headed so login can send them back
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
};
