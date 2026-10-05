// Chemins du front, alignés sur les collections de db.json
// (/properties, /properties/:id).
// Source unique : à utiliser dans App.tsx et dans tous les <Link>/<NavLink>.

export const ROUTES = {
  home: "/",
  bien: (id: string) => `/properties/${id}`,
  dashboard: "/dashboard",
  map: "/map",
} as const;

// Motifs de chemin pour createBrowserRouter (relatifs au Layout)
export const ROUTE_PATTERNS = {
  bien: "properties/:id",
  dashboard: "dashboard",
  map: "map",
} as const;
