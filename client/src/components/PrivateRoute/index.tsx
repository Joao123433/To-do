import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import type { ChildrenInterface } from "../../interfaces/ChildrenInterface";

export function PrivateRoute({ children }: ChildrenInterface) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
} 