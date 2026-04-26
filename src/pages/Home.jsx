import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLeagues, searchTeams } from "../services/footballApi";
import TeamCard from "../components/TeamCard";
import LeagueCard from "../components/LeagueCard";
import "./Home.css";

const FEATURES = [
  { icon: "🏆", title: "Classificações",  desc: "Tabelas completas das principais ligas com forma recente e estatísticas.", to: "/standings" },
  { icon: "⚽", title: "Próximos Jogos",  desc: "Calendário atualizado com horários, estádios e confrontos.",             to: "/matches"   },
  { icon: "👤", title: "Jogadores",       desc: "Busque qualquer jogador do mundo com dados detalhados e fotos.",          to: "/players"   },
  { icon: "⚖️", title: "Comparar Times",  desc: "Compare dois times lado a lado com informações completas.",              to: "/compare"   },
];

const STATS = [
  { value: "200+", label: "Ligas" },
  { value: "15k+", label: "Times" },
  { value: "100k+",label: "Jogadores" },
  { value: "Real", label: "Tempo Real" },
];

export default function Home() {
  const [leagues, setLeagues]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery]       = useState("");
  const [teams, setTeams]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => { fetchLeagues().then(setLeagues).catch(() => {}); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(null); setSelected(null);
    try {
      const data = await searchTeams(query);
      setTeams(data);
      if (!data.length) setError("Nenhum time encontrado.");
    } catch { setError("Erro ao buscar times."); }
    finally  { setLoading(false); }
  };

  const handleLeague = async (league) => {
    setSelected(league); setLoading(true); setError(null); setQuery("");
    try {
      const data = await searchTeams(league.strLeague);
      setTeams(data);
      if (!data.length) setError("Nenhum time encontrado para esta liga.");
    } catch { setError("Erro ao carregar times."); }
    finally  { setLoading(false); }
  };

  const showResults = teams.length > 0 || loading || error;

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden />
        <div className="hero-glow"    aria-hidden />
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">⚡ Dados em tempo real</span>
            <h1 className="hero-title">
              O futebol mundial<br />
              na palma da sua<br />
              <span className="hero-accent">mão.</span>
            </h1>
            <p className="hero-sub">
              Explore times, jogadores, classificações e próximos jogos
              das principais ligas do mundo — tudo em um só lugar.
            </p>
            <div className="hero-actions">
              <Link to="/standings" className="btn-primary">Ver Classificações</Link>
              <Link to="/players"   className="btn-ghost">Buscar Jogadores</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-float">
              <div className="hcf-badge">⚽</div>
              <div className="hcf-lines">
                <span /><span /><span />
              </div>
              <div className="hcf-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="hcf-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="glow-line" />
      </section>

      {/* ── Stats bar ── */}
      <section className="stats-bar">
        {STATS.map((s) => (
          <div key={s.label} className="stats-bar-item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="features-inner">
          <p className="section-label">O que você encontra aqui</p>
          <h2 className="features-title">Tudo sobre futebol em um só lugar</h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <Link key={f.title} to={f.to} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feature-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore ── */}
      <section className="explore-section">
        <div className="page">
          <p className="section-label">Explorar</p>
          <h2 className="explore-title">Busque times e ligas</h2>

          <form onSubmit={handleSearch} className="search-form">
            <input
              className="search-input"
              type="text"
              placeholder="Buscar time (ex: Arsenal, Flamengo, Real Madrid...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" type="submit">Buscar</button>
          </form>

          {leagues.length > 0 && (
            <div className="comp-grid">
              {leagues.slice(0, 10).map((l) => (
                <LeagueCard
                  key={l.idLeague}
                  league={l}
                  active={selected?.idLeague === l.idLeague}
                  onSelect={handleLeague}
                />
              ))}
            </div>
          )}

          {loading && (
            <div className="results-status">
              <div className="spinner" />
              <p>Carregando...</p>
            </div>
          )}

          {error && <div className="results-error">⚠️ {error}</div>}

          {!loading && !error && teams.length > 0 && (
            <div className="teams-list">
              {teams.map((team) => (
                <TeamCard key={team.idTeam} team={team} />
              ))}
            </div>
          )}

          {!showResults && (
            <div className="results-empty">
              <p>⚽ Busque um time ou selecione uma liga acima.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
