import { useEffect, useState } from "react";
import { fetchProperties } from "../api/properties";
import PropertyCard from "../components/PropertyCard";
import type { Bien } from "../types/bien";

export default function HomePage() {
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

  if (loading) return <p className="page-lead">Chargement…</p>;
  if (error) return <p className="page-lead" style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h1 className="page-title">Nos biens</h1>
      <p className="page-lead">{biens.length} biens disponibles à la vente ou à la location.</p>
      <div className="grid">
        {biens.map((bien) => (
          <PropertyCard key={bien.id} bien={bien} />
        ))}
      </div>
    </>
  );
}
