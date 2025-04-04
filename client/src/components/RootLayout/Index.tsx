import { faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UseTask } from "../../hooks/UseTask";
import { useAuth } from "../../hooks/UseAuth";
import { toast } from "react-toastify";


export function RootLayout() {
  const { pathname } = useLocation();
  const { isOpenNewTask } = UseTask();
  const { logout } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      toast.promise(
        async () => logout(),
        {
          pending: 'Logout',
          success: "Logout successfully"
        }
      ).catch(error => {
        toast.error(error.message)
      });
    };

  return (
    <div className="p-4 md:p-16">
      <header className="border-b-1">
        <FontAwesomeIcon icon={faList} className="text-5xl mb-4"/>
        <h1 className="text-2xl mb-2 font-bold">Basic To-Do List</h1>
        <nav className="flex gap-3">
          <Link to='/' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/" ? "border-b-2" : ""}`}>Home</Link>
          <Link to='/highpriority' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/highpriority" ? "border-b-2" : ""}`}>High Priority</Link>
          <Link to='/next7days' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/next7days" ? "border-b-2" : ""}`}>Next 7 Days</Link>
          <Link to='/archive' className={`hover:brightness-50 duration-150 ease-in font-bold ${pathname === "/archive" ? "border-b-2" : ""}`}>Archive</Link>
          <button type="button" className="font-bold py-tiny px-4 mb-1 rounded-sm hover:brightness-75 duration-300" onClick={() => isOpenNewTask()}>New</button>
          <button type="button" className="font-bold py-tiny px-4 mb-1 rounded-sm hover:brightness-75 duration-300" onClick={handleSubmit}><FontAwesomeIcon icon={faRightFromBracket}  /></button>
        </nav>
      </header>
      <main className="w-full h-full py-3" id="main">
        <Outlet />
      </main>
    </div>
  )
}