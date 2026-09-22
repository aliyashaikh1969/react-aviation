import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from '../../constants/routes'
import { PageLoader } from '../ui/PageLoader'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!user) {
    // remember where the user was headed so login can send them back
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
};
