import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="flex items-center justify-center h-login-mobile md:h-login-desktop gap-11 bg-login">
        <div className="bg-white text-neutral-400 rounded-2xl flex flex-col gap-5 px-10 py-10 lg:w-login-width">
          <h1 className="text-3xl font-bold text-black">Log in now</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="border-2 p-1 rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
            <input type="text" id="email" className="border-2 p-1 rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" className="border-2 p-1 rounded-lg" />
          </div>
          <button type="button" className="rounded-4xl p-2" onClick={login}>Login</button>
          <p>Dont have and acount? singn up</p>
        </div>
      </section>
    </>
  )
}