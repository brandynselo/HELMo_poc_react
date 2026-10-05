import { Link, useLoaderData } from "react-router";
import { ROUTES } from "../routes";
import type { Bien } from "../types/bien";

const formatPrix = (bien: Bien) =>
  new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bien.price);

export default function DashboardPage() {
  // Données chargées par dashboardLoader ; erreurs gérées par RouteError
  const biens = useLoaderData<Bien[]>();

  const totalVente = biens.filter((b) => b.status === "sale").length;
  const totalLocation = biens.filter((b) => b.status === "rent").length;

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
                  <Link to={ROUTES.bien(bien.id)} className="dashboard__link">
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
