import { Link, useLoaderData } from "react-router";
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

export default function PropertyDetailPage() {
  // Données chargées par bienLoader ; erreurs gérées par RouteError
  const bien = useLoaderData<Bien>();

  return (
    <div className="detail">
      <Link to={ROUTES.home} className="detail__back">← Retour à la liste</Link>

      <div className="detail__hero">
        <img src={bien.imageUrl} alt={bien.title} />
        <span className={`badge badge--${bien.status}`}>
          {bien.status === "sale" ? "À vendre" : "À louer"}
        </span>
      </div>

      <div className="detail__content">
        <p className="card__price">{formatPrix(bien)}</p>
        <h1 className="detail__title">{bien.title}</h1>
        <p className="card__place">{bien.neighborhood}</p>

        <ul className="card__facts detail__facts">
          <li>{bien.type}</li>
          {bien.bedrooms > 0 && <li>{bien.bedrooms} chambre{bien.bedrooms > 1 ? "s" : ""}</li>}
          {bien.landArea > 0 && <li>{bien.landArea} m²</li>}
        </ul>

        <p className="detail__desc">{bien.description}</p>

        <div className="detail__actions">
          <button className="btn btn--primary">Prendre rendez-vous</button>
          <button className="btn btn--outline">Contacter l&rsquo;agence</button>
        </div>
      </div>
    </div>
  );
}
