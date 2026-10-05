// Types alignés sur la structure de l'API (db.json)

// Tableau exporté → utilisé par FilterBar pour les options du <select>
export const TYPE_BIENS = [
  "Appartement",
  "Maison",
  "Studio",
  "Loft",
  "Villa",
  "Terrain",
] as const;

export type TypeBien = (typeof TYPE_BIENS)[number];

export type Statut = "sale" | "rent";

export interface Bien {
  id: string;
  title: string;
  type: TypeBien;
  price: number;
  bedrooms: number;
  landArea: number; // en m²
  status: Statut;
  description: string;
  imageUrl: string;
  neighborhood: string;
  // Coordonnées GPS (optionnelles tant que db.json n'est pas complété)
  lat?: number;
  lng?: number;
}
