import { Link } from "react-router";
import { ROUTES } from "../routes";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Page introuvable</h1>
      <p className="page-lead">
        Cette page n&rsquo;existe pas ou a été déplacée.
      </p>
      <Link to={ROUTES.home} className="btn btn--primary not-found__cta">
        Retour à l&rsquo;accueil
      </Link>
    </div>
  );
}
