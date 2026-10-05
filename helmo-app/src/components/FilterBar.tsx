import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { FILTER_KEYS, hasActiveFilters, parseFilters } from "../api/filters";
import { TYPE_BIENS } from "../types/bien";

// Les champs portent les noms des filtres de l'API (type, price_lte, bedrooms_gte).
// Ce composant est remonté (via `key`) à chaque changement d'URL par HomePage :
// l'état local repart donc toujours de l'URL, sans useEffect de resynchronisation.
export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const applied = parseFilters(searchParams);

  // ── État local (inputs contrôlés) ────────────────────────────────────────
  const [type,         setType]         = useState(applied.type ?? "");
  const [priceLte,     setPriceLte]     = useState(applied.price_lte ?? "");
  const [bedroomsGte,  setBedroomsGte]  = useState(applied.bedrooms_gte ?? "");

  // ── Soumission ────────────────────────────────────────────────────────────
  // Met à jour l'URL → React Router re-déclenche biensLoader → HomePage re-render
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const values = { type, price_lte: priceLte, bedrooms_gte: bedroomsGte };
    const next = new URLSearchParams();
    for (const key of FILTER_KEYS) {
      if (values[key]) next.set(key, values[key]);
    }

    setSearchParams(next);
  }

  function handleReset() {
    setType("");
    setPriceLte("");
    setBedroomsGte("");
    setSearchParams(new URLSearchParams());
  }

  // Basé sur les filtres appliqués (URL), comme le compteur de HomePage
  const hasFilters = hasActiveFilters(applied);

  return (
    <form onSubmit={handleSubmit} className="filter-bar" role="search">
      {/* ── Type de bien ─────────────────────────────────────────────── */}
      <div className="filter-bar__group">
        <label htmlFor="filter-type" className="filter-bar__label">Type</label>
        <select
          id="filter-type"
          name="type"
          className="filter-bar__control"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Tous les types</option>
          {TYPE_BIENS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* ── Prix maximum ─────────────────────────────────────────────── */}
      <div className="filter-bar__group">
        <label htmlFor="filter-price-lte" className="filter-bar__label">
          Prix maximum
        </label>
        <input
          id="filter-price-lte"
          name="price_lte"
          type="number"
          className="filter-bar__control"
          placeholder="Ex : 400 000"
          min={0}
          step={10000}
          value={priceLte}
          onChange={(e) => setPriceLte(e.target.value)}
        />
      </div>

      {/* ── Chambres minimum ─────────────────────────────────────────── */}
      <div className="filter-bar__group">
        <label htmlFor="filter-bedrooms-gte" className="filter-bar__label">
          Chambres min.
        </label>
        <input
          id="filter-bedrooms-gte"
          name="bedrooms_gte"
          type="number"
          className="filter-bar__control"
          placeholder="Ex : 2"
          min={0}
          max={10}
          step={1}
          value={bedroomsGte}
          onChange={(e) => setBedroomsGte(e.target.value)}
        />
      </div>

      {/* ── Actions ──────────────────────────────────────────────────── */}
      <div className="filter-bar__actions">
        <button type="submit" className="btn btn--primary">
          Filtrer
        </button>
        {hasFilters && (
          <button
            type="button"
            className="btn btn--outline"
            onClick={handleReset}
          >
            Réinitialiser
          </button>
        )}
      </div>
    </form>
  );
}
