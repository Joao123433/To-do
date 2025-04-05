import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { toast } from "react-toastify";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^.{4,}$/.test(password);
  
    if (!isPasswordValid || !isEmailValid) {
      toast.error("Preencha os campos corretamente!");
      return;
    }
    
    toast.promise(
      async () => login(email, password),
      {
        pending: 'logging in user',
        success: "Login successfully"
      }
    ).catch(error => {
      toast.error(error.message)
    });
  };

  const verifySubmit = email === "" || password === "";

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const verifyEmail = (ev: { target: { value: string; classList: { add: (arg0: string) => void; remove: (arg0: string) => void; }; }; }) => {
    const email = ev.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    setEmail(email);

    ev.target.classList.add("border-red-500")

    if(email.match(regex) || email.length === 0) {
      ev.target.classList.remove("border-red-500")
    }
  }

  const verifyPassword = (ev: { target: { value: string; classList: { add: (arg0: string) => void; remove: (arg0: string) => void; }; }; }) => {
    const password = ev.target.value;
    const regex = /^.{4,}$/;
    
    setPassword(password);

    ev.target.classList.add("border-red-500")

    if(password.match(regex)) {
      ev.target.classList.remove("border-red-500")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-login-mobile md:h-login-desktop gap-11 bg-login">
        <div className="bg-white text-neutral-400 rounded-2xl flex flex-col gap-7 px-10 py-10 lg:w-login-width">
          <h1 className="text-3xl font-bold text-black">Log in</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" className="border-2 p-2 rounded-lg focus:outline-none" value={email} onChange={verifyEmail} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="border-2 p-2 rounded-lg focus:outline-none" value={password} onChange={verifyPassword} required />
          </div>
          <button type="submit" className="rounded-4xl p-2 text-white hover:brightness-90 disabled:brightness-75" disabled={verifySubmit}>Login</button>
        </div>
      </form>
    </>
  )
}