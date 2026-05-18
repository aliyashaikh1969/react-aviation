import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Protected = ({ children }) => {

  const { authData } = useAuth();

  if (!authData.isLoggedIn) {
    return <Navigate to="/AuthPage" />;
  }

  return children;
};