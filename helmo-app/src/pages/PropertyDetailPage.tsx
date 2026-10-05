import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchPropertyById } from "../api/properties";
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
  const { id } = useParams<{ id: string }>();
  const [bien, setBien] = useState<Bien | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPropertyById(id)
      .then((data) => setBien(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="page-lead">Chargement…</p>;
  if (error) return <p className="page-lead" style={{ color: "red" }}>{error}</p>;
  if (!bien) return <p className="page-lead">Bien introuvable.</p>;

  return (
    <div className="detail">
      <Link to="/" className="detail__back">← Retour à la liste</Link>

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
