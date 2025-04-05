import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Index";
import { RootLayout } from "./components/RootLayout/Index";
import { HighPriority } from "./pages/Home/HighPriority";
import { Next7Days } from "./pages/Home/Next7Days";
import { Archive } from "./pages/Home/Archives";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./pages/Home/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/highpriority',
        element: <HighPriority />
      }, 
      {
        path: '/next7days',
        element: <Next7Days />
      },
      {
        path: '/archive',
        element: <Archive />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
])