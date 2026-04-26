import { useState } from "react";
import { Link } from "react-router-dom";
import { searchPlayersByName } from "../services/footballApi";
import { tl, positionNames, countryNames } from "../utils/translations";
import "./Players.css";

function Players() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await searchPlayersByName(query);
      setPlayers(data);
      if (!data.length) setError("Nenhum jogador encontrado.");
    } catch {
      setError("Erro ao buscar jogadores.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const calcAge = (dateStr) => {
    if (!dateStr) return null;
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const statusMap = {
    Active:   "Ativo",
    Retired:  "Aposentado",
    Coaching: "Treinador",
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Jogadores</h1>
        <p className="page-sub">Busque jogadores pelo nome.</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Ex: Messi, Ronaldo, Vini Jr..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" type="submit">Buscar</button>
      </form>

      {loading && (
        <div className="results-status">
          <div className="spinner" />
          <p>Buscando jogadores...</p>
        </div>
      )}

      {error && <div className="results-error">⚠️ {error}</div>}

      {!loading && !error && players.length > 0 && (
        <div className="players-grid">
          {players.map((p) => (
            <Link key={p.idPlayer} to={`/player/${p.idPlayer}`} className="player-card">
              <div className="player-img-wrap">
                {p.strCutout || p.strThumb ? (
                  <img
                    src={p.strCutout ?? p.strThumb}
                    alt={p.strPlayer}
                    className="player-img"
                  />
                ) : (
                  <div className="player-img-placeholder">⚽</div>
                )}
              </div>
              <div className="player-info">
                <h3 className="player-name">{p.strPlayer}</h3>
                <span className="player-team">{p.strTeam ?? "—"}</span>
                <div className="player-tags">
                  {p.strPosition && (
                    <span className="player-tag">{tl(positionNames, p.strPosition)}</span>
                  )}
                  {p.strNationality && (
                    <span className="player-tag player-tag--nat">{tl(countryNames, p.strNationality)}</span>
                  )}
                  {p.strStatus && (
                    <span className={`player-tag player-tag--status ${p.strStatus === "Active" ? "active" : ""}`}>
                      {statusMap[p.strStatus] ?? p.strStatus}
                    </span>
                  )}
                </div>
                <div className="player-meta">
                  {p.dateBorn && (
                    <span>🎂 {formatDate(p.dateBorn)} ({calcAge(p.dateBorn)} anos)</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && !searched && (
        <div className="results-empty">
          <p>🔍 Digite o nome de um jogador para buscar.</p>
        </div>
      )}
    </div>
  );
}

export default Players;
