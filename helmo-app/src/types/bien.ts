// Types alignés sur la structure de l'API (db.json)

export type TypeBien =
  | "Appartement"
  | "Maison"
  | "Studio"
  | "Loft"
  | "Villa"
  | "Terrain";

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
}
