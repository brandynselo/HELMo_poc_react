import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    // Layout commun : header + footer partagés
    element: <Layout />,
    children: [
      {
        // Route index → liste des biens
        index: true,
        element: <HomePage />,
      },
      {
        // Route détail → /biens/:id  (useParams récupère id)
        path: "biens/:id",
        element: <PropertyDetailPage />,
      },
      {
        // Route tableau de bord → /dashboard
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        // Route 404 — capture tout chemin non reconnu
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
