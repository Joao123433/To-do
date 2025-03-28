import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  console.log(isAuthenticated)

  return (
    <>
      <h1>login</h1>
      <button type="button" onClick={login}>Login</button>
    </>
  )
}