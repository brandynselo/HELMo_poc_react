import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchProperties } from "../api/properties";
import type { Bien } from "../types/bien";

const formatPrix = (bien: Bien) =>
  new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bien.price);

export default function DashboardPage() {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties()
      .then((data) => setBiens(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, []);

  const totalVente = biens.filter((b) => b.status === "sale").length;
  const totalLocation = biens.filter((b) => b.status === "rent").length;

  if (loading) return <p className="page-lead">Chargement…</p>;
  if (error) return <p className="page-lead" style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h1 className="page-title">Tableau de bord</h1>

      {/* Statistiques */}
      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__value">{biens.length}</span>
          <span className="stat-card__label">Biens total</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{totalVente}</span>
          <span className="stat-card__label">À vendre</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{totalLocation}</span>
          <span className="stat-card__label">À louer</span>
        </div>
      </div>

      {/* Table de gestion */}
      <div className="dashboard__table-wrap">
        <table className="dashboard__table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Type</th>
              <th>Quartier</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {biens.map((bien) => (
              <tr key={bien.id}>
                <td>
                  <Link to={`/biens/${bien.id}`} className="dashboard__link">
                    {bien.title}
                  </Link>
                </td>
                <td>{bien.type}</td>
                <td>{bien.neighborhood}</td>
                <td>{formatPrix(bien)}</td>
                <td>
                  <span className={`badge badge--${bien.status}`}>
                    {bien.status === "sale" ? "Vente" : "Location"}
                  </span>
                </td>
                <td className="dashboard__actions">
                  <button
                    className="btn btn--sm btn--outline"
                    onClick={() => alert(`Édition de "${bien.title}" (non implémenté)`)}
                  >
                    Éditer
                  </button>
                  <button
                    className="btn btn--sm btn--danger"
                    onClick={() => alert(`Suppression de "${bien.title}" (non implémenté)`)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
