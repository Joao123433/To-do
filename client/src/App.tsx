import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TaskProvider } from "./context/TaskContext"
import Modal from "react-modal"

Modal.setAppElement("#root")

function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  )
}

export default App
