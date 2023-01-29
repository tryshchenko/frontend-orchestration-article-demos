import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Combined from "./pages/Combined";
import Orchestrated from "./pages/Orchestrated";
import Home from "./pages/Home";
import OrchestratedBatched from "./pages/OrchestratedBatched";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/combined",
    element: <Combined />,
  },
  {
    path: "/orchestrated",
    element: <Orchestrated />,
  },
  {
    path: "/orchestrated-batched",
    element: <OrchestratedBatched />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
