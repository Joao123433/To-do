import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="border-b-1">
        <FontAwesomeIcon icon={faList} className="text-5xl mb-4"/>
        <h1 className="text-2xl mb-2 font-bold">Basic To-Do List</h1>
        <nav className="flex gap-3">
          <Link to='/' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/" ? "border-b-2" : ""}`}>Home</Link>
          <Link to='/' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/highPriority" ? "border-b-2" : ""}`}>High Priority</Link>
          <Link to='/' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/nextDays" ? "border-b-2" : ""}`}>Next 7 Days</Link>
          <button type="button" className="font-bold py-tiny px-4 mb-1 rounded-sm hover:brightness-50 duration-300">New</button>
        </nav>
      </header>
      <main className="w-full h-full py-3">
        <Outlet />
      </main>
    </>
  )
}