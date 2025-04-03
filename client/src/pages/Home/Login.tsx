import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { toast } from "react-toastify";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifySubmit = email === "" || password === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    
    toast.promise(
      async () => login(email, password),
      {
        pending: 'Registering user',
        success: "Login successfully"
      }
    ).catch(error => {
      toast.error(error.message)
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-login-mobile md:h-login-desktop gap-11 bg-login">
        <div className="bg-white text-neutral-400 rounded-2xl flex flex-col gap-7 px-10 py-10 lg:w-login-width">
          <h1 className="text-3xl font-bold text-black">Log in</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" className="border-2 p-2 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" className="border-2 p-2 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="rounded-4xl p-2 text-white hover:brightness-90" disabled={verifySubmit}>Login</button>
          <p>Dont have and acount? <NavLink to={"/signup"} className="border-b-2 text-neutral-600">Singn up</NavLink></p>
        </div>
      </form>
    </>
  )
}