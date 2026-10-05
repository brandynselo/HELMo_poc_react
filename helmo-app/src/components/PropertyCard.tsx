import { Link } from "react-router";
import { ROUTES } from "../routes";
import type { Bien } from "../types/bien";

const formatPrix = (bien: Bien) => {
  const montant = new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bien.price);
  return bien.status === "rent" ? `${montant} / mois` : montant;
};

export default function PropertyCard({ bien }: { bien: Bien }) {
  return (
    <article className="card">
      <div className="card__media">
        <img src={bien.imageUrl} alt={bien.title} loading="lazy" />
        <span className={`badge badge--${bien.status}`}>
          {bien.status === "sale" ? "À vendre" : "À louer"}
        </span>
      </div>
      <div className="card__body">
        <p className="card__price">{formatPrix(bien)}</p>
        <h3 className="card__title">{bien.title}</h3>
        <p className="card__place">{bien.neighborhood}</p>
        <ul className="card__facts">
          <li>{bien.type}</li>
          {bien.bedrooms > 0 && <li>{bien.bedrooms} ch.</li>}
          {bien.landArea > 0 && <li>{bien.landArea} m²</li>}
        </ul>
        {/* Lien de navigation vers la page de détail */}
        <Link to={ROUTES.bien(bien.id)} className="card__cta">
          Voir le bien →
        </Link>
      </div>
    </article>
  );
}
