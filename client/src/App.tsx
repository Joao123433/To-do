import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TaskProvider } from "./context/TaskContext"
import Modal from "react-modal"
import { AuthProvider } from "./context/AuthContext"

Modal.setAppElement("#root")

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
