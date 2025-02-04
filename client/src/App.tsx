import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TaskProvider } from "./context/TaskContext"

function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  )
}

export default App
