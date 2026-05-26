import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const user =
    localStorage.getItem("name");

  if (!user) {

    return <Navigate to="/auth" />;
  }

  return children;
}