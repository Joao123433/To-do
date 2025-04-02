import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TaskProvider } from "./context/TaskContext"
import Modal from "react-modal"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"

Modal.setAppElement("#root")

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
      <ToastContainer theme="dark" />
    </AuthProvider>
  )
}

export default App
