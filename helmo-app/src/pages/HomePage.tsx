import { Link, useLoaderData, useSearchParams } from "react-router";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import { hasActiveFilters, parseFilters } from "../api/filters";
import { ROUTES } from "../routes";
import type { Bien } from "../types/bien";

export default function HomePage() {
  // Données déjà chargées par biensLoader (re-joué à chaque changement d'URL)
  const biens = useLoaderData<Bien[]>();

  // Mêmes règles de lecture des filtres que le loader (parseFilters)
  const [searchParams] = useSearchParams();
  const hasFilters = hasActiveFilters(parseFilters(searchParams));

  return (
    <>
      <h1 className="page-title">Nos biens</h1>

      {/* Barre de filtres : met à jour l'URL → biensLoader se rejoue.
          `key` : repart de l'URL à chaque changement (retour/avance, reset). */}
      <FilterBar key={searchParams.toString()} />

      <p className="page-lead">
        {hasFilters
          ? `${biens.length} résultat${biens.length !== 1 ? "s" : ""} pour vos critères`
          : `${biens.length} biens disponibles à la vente ou à la location.`}
      </p>

      {biens.length === 0 ? (
        <p className="filter-empty">
          Aucun bien ne correspond à vos critères.{" "}
          <Link to={ROUTES.home} className="filter-empty__link">
            Voir tous les biens
          </Link>
        </p>
      ) : (
        <div className="grid">
          {biens.map((bien) => (
            <PropertyCard key={bien.id} bien={bien} />
          ))}
        </div>
      )}
    </>
  );
}
