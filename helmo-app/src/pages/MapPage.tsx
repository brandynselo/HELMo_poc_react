import { useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// MapLibre 6 charge ses calculs (décodage des tuiles) dans un Web Worker séparé.
// Vite pré-bundle maplibre-gl ailleurs, donc MapLibre ne retrouve plus ce fichier
// (404 silencieux → aucune tuile vectorielle ne s'affiche, seuls les markers).
// On lui donne explicitement l'URL du worker.
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import { ROUTES } from "../routes";
import type { Bien } from "../types/bien";

maplibregl.setWorkerUrl(workerUrl);

// Style vectoriel basé sur OpenStreetMap, gratuit et sans clé API.
// L'attribution © OpenStreetMap est incluse dans le style.
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function MapPage() {
  const biens = useLoaderData<Bien[]>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: containerRef.current!,
      style: MAP_STYLE,
      center: [4.4, 50.6], // [lng, lat] : centre approximatif de la Belgique
      zoom: 7,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    const bounds = new maplibregl.LngLatBounds();

    for (const bien of biens) {
      // Les biens sans coordonnées ne peuvent pas être placés
      if (bien.lat === undefined || bien.lng === undefined) continue;

      // Contenu du popup construit en DOM (textContent évite l'injection HTML)
      const content = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = bien.title;
      const link = document.createElement("a");
      link.textContent = "Voir le bien →";
      link.href = ROUTES.bien(bien.id);
      link.style.display = "block";
      // Navigation SPA au lieu d'un rechargement complet
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(ROUTES.bien(bien.id));
      });
      content.append(title, link);

      new maplibregl.Marker()
        .setLngLat([bien.lng, bien.lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setDOMContent(content))
        .addTo(map);

      bounds.extend([bien.lng, bien.lat]);
    }

    // Cadre la carte pour montrer tous les biens placés
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 0 });
    }

    // Nettoyage : démontage de la page et double effet du StrictMode
    return () => map.remove();
  }, [biens, navigate]);

  return (
    <>
      <h1 className="page-title">Carte des biens</h1>
      <div ref={containerRef} className="map" />
    </>
  );
}
