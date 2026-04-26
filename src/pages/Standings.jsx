import { useState, useEffect } from "react";
import { fetchLeagues, fetchStandings } from "../services/footballApi";
import { Link } from "react-router-dom";
import LeagueCard from "../components/LeagueCard";
import "./Standings.css";

const SEASONS = ["2024-2025", "2023-2024", "2022-2023", "2021-2022"];

function Standings() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [season, setSeason] = useState(SEASONS[0]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeagues().then(setLeagues).catch(() => {});
  }, []);

  const load = async (league, s) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStandings(league.idLeague, s);
      setTable(data);
      if (!data.length) setError("Classificação não disponível para esta temporada.");
    } catch {
      setError("Erro ao carregar classificação.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeague = (league) => {
    setSelectedLeague(league);
    load(league, season);
  };

  const handleSeason = (s) => {
    setSeason(s);
    if (selectedLeague) load(selectedLeague, s);
  };

  const formColor = (char) => {
    if (char === "W") return "form-w";
    if (char === "L") return "form-l";
    return "form-d";
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Classificação</h1>
        <p className="page-sub">Selecione uma liga e temporada.</p>
      </div>

      <div className="standings-controls">
        <div className="comp-grid">
          {leagues.slice(0, 10).map((l) => (
            <LeagueCard
              key={l.idLeague}
              league={l}
              active={selectedLeague?.idLeague === l.idLeague}
              onSelect={handleLeague}
            />
          ))}
        </div>

        <div className="season-tabs">
          {SEASONS.map((s) => (
            <button
              key={s}
              className={`season-tab ${season === s ? "active" : ""}`}
              onClick={() => handleSeason(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="results-status">
          <div className="spinner" />
          <p>Carregando classificação...</p>
        </div>
      )}

      {error && <div className="results-error">⚠️ {error}</div>}

      {!loading && !error && table.length > 0 && (
        <div className="standings-wrap">
          <div className="standings-head">
            <span>#</span>
            <span>Time</span>
            <span title="Jogos">J</span>
            <span title="Vitórias">V</span>
            <span title="Empates">E</span>
            <span title="Derrotas">D</span>
            <span title="Gols Pró">GP</span>
            <span title="Gols Contra">GC</span>
            <span title="Saldo">SG</span>
            <span>Forma</span>
            <span>Pts</span>
          </div>
          {table.map((row) => (
            <Link
              key={row.idStanding}
              to={`/team/${row.idTeam}`}
              className="standings-row"
            >
              <span className="st-rank">{row.intRank}</span>
              <span className="st-team">
                <img src={row.strBadge} alt={row.strTeam} className="st-badge" />
                {row.strTeam}
              </span>
              <span>{row.intPlayed}</span>
              <span>{row.intWin}</span>
              <span>{row.intDraw}</span>
              <span>{row.intLoss}</span>
              <span>{row.intGoalsFor}</span>
              <span>{row.intGoalsAgainst}</span>
              <span>{row.intGoalDifference}</span>
              <span className="st-form">
                {(row.strForm ?? "").split("").map((c, i) => (
                  <span key={i} className={`form-dot ${formColor(c)}`}>{c}</span>
                ))}
              </span>
              <span className="st-pts">{row.intPoints}</span>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && !selectedLeague && (
        <div className="results-empty">
          <p>⚽ Selecione uma liga acima.</p>
        </div>
      )}
    </div>
  );
}

export default Standings;
