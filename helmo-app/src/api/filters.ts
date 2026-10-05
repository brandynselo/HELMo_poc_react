import { TYPE_BIENS, type TypeBien } from "../types/bien";

// ─── Filtres de recherche ────────────────────────────────────────────────────
// L'API (json-server) fait référence : les clés des filtres dans l'URL du front
// sont EXACTEMENT celles attendues par l'API. Aucune traduction n'est faite.
//
//   ?type=Maison  &  price_lte=300000  &  bedrooms_gte=2
//        ↓                 ↓                   ↓
//   GET /properties?type=Maison&price_lte=300000&bedrooms_gte=2

export const FILTER_KEYS = ["type", "price_lte", "bedrooms_gte"] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

export interface BienFilters {
  type?: TypeBien;     // égalité exacte
  price_lte?: string;  // prix ≤
  bedrooms_gte?: string; // chambres ≥
}

const isPositiveInteger = (value: string) => /^\d+$/.test(value);

/**
 * Lit et valide les filtres présents dans l'URL.
 * Toute valeur invalide est ignorée (jamais envoyée à l'API).
 */
export function parseFilters(searchParams: URLSearchParams): BienFilters {
  const filters: BienFilters = {};

  const type = searchParams.get("type");
  if (type && (TYPE_BIENS as readonly string[]).includes(type)) {
    filters.type = type as TypeBien;
  }

  const priceLte = searchParams.get("price_lte");
  if (priceLte && isPositiveInteger(priceLte)) filters.price_lte = priceLte;

  const bedroomsGte = searchParams.get("bedrooms_gte");
  if (bedroomsGte && isPositiveInteger(bedroomsGte)) {
    filters.bedrooms_gte = bedroomsGte;
  }

  return filters;
}

/** Vrai si au moins un filtre valide est actif. */
export const hasActiveFilters = (filters: BienFilters) =>
  FILTER_KEYS.some((key) => !!filters[key]);
