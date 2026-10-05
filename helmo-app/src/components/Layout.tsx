import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-header__logo">ImmoVision</Link>
        <nav className="site-nav" aria-label="Navigation principale">
          {/* end évite que "/" soit actif sur toutes les routes */}
          <NavLink to="/" end>Biens</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">ImmoVision, POC React</footer>
    </>
  );
}
