import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-header__logo">ImmoVision</Link>
        <nav className="site-nav" aria-label="Navigation principale">
          <NavLink to="/" end>Biens</NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">ImmoVision, POC React</footer>
    </>
  );
}
