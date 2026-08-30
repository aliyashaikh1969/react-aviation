import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Protected = ({ children }) => {

  const { user,loading } = useAuth();

    if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-[#0A2A6B] border-t-transparent rounded-full" />
    </div>
  )



  if (!user) {
    return <Navigate to="/AuthPage" replace/>;
  }

  return children;
};