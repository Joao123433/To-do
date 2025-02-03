import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Index";
import { RootLayout } from "./components/RootLayout/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])