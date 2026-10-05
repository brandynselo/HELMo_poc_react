import { Link, NavLink, Outlet, useNavigation } from "react-router";
import { ROUTES } from "../routes";

export default function Layout() {
  // "loading" tant qu'un loader de la prochaine page est en cours
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <header className="site-header">
        <Link to={ROUTES.home} className="site-header__logo">ImmoVision</Link>
        <nav className="site-nav" aria-label="Navigation principale">
          {/* end évite que "/" soit actif sur toutes les routes */}
          <NavLink to={ROUTES.home} end>Biens</NavLink>
          <NavLink to={ROUTES.map}>Carte</NavLink>
          <NavLink to={ROUTES.dashboard}>Dashboard</NavLink>
        </nav>
      </header>
      <main className="site-main" aria-busy={isLoading} style={{ opacity: isLoading ? 0.5 : 1 }}>
        {isLoading && <p className="page-lead">Chargement…</p>}
        <Outlet />
      </main>
      <footer className="site-footer">ImmoVision, POC React</footer>
    </>
  );
}
