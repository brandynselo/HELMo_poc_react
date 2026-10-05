import type { Bien } from "../types/bien";
import { FILTER_KEYS, type BienFilters } from "./filters";

export const API_BASE_URL = "http://localhost:4000";

// Routes exposées nativement par json-server, d'après les collections de
// api/db.json ("properties", "reviews") :
//   GET /properties
//   GET /properties/:id
//   GET /properties/:id/reviews   (reviews.propertyId → properties.id)
export const API_ROUTES = {
  biens: "/properties",
  bien: (id: string) => `/properties/${encodeURIComponent(id)}`,
  avis: (id: string) => `/properties/${encodeURIComponent(id)}/reviews`,
} as const;

// Une réponse HTTP en erreur est lancée sous forme de `Response` :
// React Router la reconnaît et la transmet à l'errorElement (isRouteErrorResponse).
async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Response(response.statusText, { status: response.status });
  }
  return response.json() as Promise<T>;
}

/** Les filtres ont déjà les noms de l'API : ils sont transmis tels quels. */
export const fetchBiens = (filters: BienFilters = {}, signal?: AbortSignal) => {
  const params = new URLSearchParams();

  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }

  const query = params.toString();
  return getJson<Bien[]>(
    query ? `${API_ROUTES.biens}?${query}` : API_ROUTES.biens,
    signal,
  );
};

export const fetchBienById = (id: string, signal?: AbortSignal) =>
  getJson<Bien>(API_ROUTES.bien(id), signal);
