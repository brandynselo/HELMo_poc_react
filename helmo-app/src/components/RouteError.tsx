import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { API_BASE_URL } from "../api/biens";
import { ROUTES } from "../routes";

// errorElement : affiché si le loader ou le rendu de la route lance une erreur.
export default function RouteError() {
  const error = useRouteError();

  let message = "Une erreur inattendue est survenue.";
  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404
        ? "Bien introuvable."
        : `Erreur API : ${error.status} ${error.statusText}`;
  } else if (error instanceof TypeError) {
    message = `Impossible de joindre l'API (${API_BASE_URL}).`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <p className="page-lead" style={{ color: "red" }}>{message}</p>
      <Link to={ROUTES.home} className="detail__back">← Retour à la liste</Link>
    </>
  );
}
