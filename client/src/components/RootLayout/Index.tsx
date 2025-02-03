import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="border-b-1">
        <FontAwesomeIcon icon={faList} className="text-5xl mb-4"/>
        <h1 className="text-2xl mb-2">Basic To-Do List</h1>
        <nav className="flex gap-3">
          <Link to='/' className={`text-white hover:brightness-50 ${pathname === "/" ? "border-b-2" : ""}`}>Home</Link>
          <Link to='/' className={`text-white hover:brightness-50 ${pathname === "/highPriority" ? "border-b-2" : ""}`}>High Priority Tasks</Link>
          <Link to='/' className={`text-white hover:brightness-50 ${pathname === "/nextDays" ? "border-b-2" : ""}`}>Next 7 Days</Link>
        </nav>
      </header>
      <main className="w-full h-full py-3">
        <Outlet />
      </main>
    </>
  )
}