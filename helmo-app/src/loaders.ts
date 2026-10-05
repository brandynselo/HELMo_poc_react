import type { LoaderFunctionArgs } from "react-router";
import { fetchBienById, fetchBiens } from "./api/biens";
import { parseFilters } from "./api/filters";

// Les loaders s'exécutent AVANT le rendu de la page, à chaque navigation.
// Quand l'URL change (ex. nouveaux searchParams via FilterBar), React Router
// re-déclenche automatiquement le loader concerné.
// `request.signal` annule le fetch si l'utilisateur quitte la page entre-temps.

export const biensLoader = ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  return fetchBiens(parseFilters(searchParams), request.signal);
};

export const bienLoader = ({ params, request }: LoaderFunctionArgs) =>
  fetchBienById(params.id!, request.signal);

// Le dashboard liste tous les biens (pas de filtres).
export const dashboardLoader = ({ request }: LoaderFunctionArgs) =>
  fetchBiens({}, request.signal);
