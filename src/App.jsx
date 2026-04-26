import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import TeamDetails from "./pages/TeamDetails";
import Compare from "./pages/Compare";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";
import Players from "./pages/Players";
import LeagueDetails from "./pages/LeagueDetails";
import PlayerDetails from "./pages/PlayerDetails";
import About from "./pages/About";
import logo from "./logo.png";
import "./App.css";

const NAV_LINKS = [
  { to: "/",          label: "Início" },
  { to: "/standings", label: "Classificação" },
  { to: "/matches",   label: "Jogos" },
  { to: "/players",   label: "Jogadores" },
  { to: "/compare",   label: "Comparar" },
  { to: "/about",     label: "Sobre" },
];

function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
        <img src={logo} alt="FutVision" style={{ height: "30px", width: "auto" }} />
        Fut<span>Vision</span>
      </Link>

      <div className={`navbar-links ${open ? "open" : ""}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${pathname === to ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>

      <button className="nav-hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">Fut<span>Vision</span></div>
          <p>Plataforma de dados do futebol mundial em tempo real. Explore times, jogadores, ligas e muito mais.</p>
        </div>
        <div className="footer-col">
          <h4>Navegação</h4>
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Dados</h4>
          <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">TheSportsDB</a>
          <a href="https://www.thesportsdb.com/api.php" target="_blank" rel="noreferrer">Documentação da API</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FutVision — Desenvolvido por Eduardo Colombari Elias</span>
        <div className="footer-bottom-links">
          <Link to="/about">Sobre</Link>
          <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">API</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/team/:id"   element={<TeamDetails />} />
        <Route path="/league/:id" element={<LeagueDetails />} />
        <Route path="/player/:id" element={<PlayerDetails />} />
        <Route path="/standings"  element={<Standings />} />
        <Route path="/matches"    element={<Matches />} />
        <Route path="/players"    element={<Players />} />
        <Route path="/compare"    element={<Compare />} />
        <Route path="/about"      element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
