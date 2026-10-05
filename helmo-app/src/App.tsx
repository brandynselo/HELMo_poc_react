import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import RouteError from "./components/RouteError";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import MapPage from "./pages/MapPage";
import { biensLoader, bienLoader, dashboardLoader } from "./loaders";
import { ROUTE_PATTERNS } from "./routes";

const router = createBrowserRouter([
  {
    // Layout commun : header + footer partagés
    element: <Layout />,
    // Affiché pendant le tout premier chargement (loaders initiaux)
    HydrateFallback: () => <p className="page-lead">Chargement…</p>,
    children: [
      {
        // Route index → liste des biens
        index: true,
        loader: biensLoader,
        element: <HomePage />,
        errorElement: <RouteError />,
      },
      {
        // Route détail → /properties/:id
        path: ROUTE_PATTERNS.bien,
        loader: bienLoader,
        element: <PropertyDetailPage />,
        errorElement: <RouteError />,
      },
      {
        // Route tableau de bord → /dashboard
        path: ROUTE_PATTERNS.dashboard,
        loader: dashboardLoader,
        element: <DashboardPage />,
        errorElement: <RouteError />,
      },
      {
        path: ROUTE_PATTERNS.map,
        loader: biensLoader,
        element: <MapPage />,
        errorElement: <RouteError />,
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
