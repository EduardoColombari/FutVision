import { useState, useEffect } from "react";
import { fetchLeagues, fetchNextEvents } from "../services/footballApi";
import LeagueCard from "../components/LeagueCard";
import "./Matches.css";

function Matches() {
  const [leagues, setLeagues] = useState([]);
  const [selected, setSelected] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeagues().then(setLeagues).catch(() => {});
  }, []);

  const handleLeague = async (league) => {
    setSelected(league);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNextEvents(league.idLeague);
      setEvents(data);
      if (!data.length) setError("Nenhum jogo encontrado.");
    } catch {
      setError("Erro ao carregar jogos.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr, timeStr) => {
    const dt = new Date(`${dateStr}T${timeStr}`);
    return dt.toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Próximos Jogos</h1>
        <p className="page-sub">Selecione uma liga para ver os próximos jogos.</p>
      </div>

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

      {loading && (
        <div className="results-status">
          <div className="spinner" />
          <p>Carregando jogos...</p>
        </div>
      )}

      {error && <div className="results-error">⚠️ {error}</div>}

      {!loading && !error && events.length > 0 && (
        <div className="matches-list">
          {events.map((ev) => (
            <div key={ev.idEvent} className="match-card">
              {ev.strThumb && (
                <img src={ev.strThumb} alt={ev.strEvent} className="match-thumb" />
              )}
              <div className="match-body">
                <div className="match-teams">
                  <div className="match-team">
                    <img src={ev.strHomeTeamBadge} alt={ev.strHomeTeam} className="match-badge" />
                    <span>{ev.strHomeTeam}</span>
                  </div>
                  <div className="match-vs">VS</div>
                  <div className="match-team match-team--away">
                    <img src={ev.strAwayTeamBadge} alt={ev.strAwayTeam} className="match-badge" />
                    <span>{ev.strAwayTeam}</span>
                  </div>
                </div>
                <div className="match-meta">
                  <span>📅 {formatDate(ev.dateEvent, ev.strTime)}</span>
                  {ev.strVenue && <span>🏟️ {ev.strVenue}</span>}
                  <span className="match-round">Rodada {ev.intRound}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && !selected && (
        <div className="results-empty">
          <p>⚽ Selecione uma liga acima.</p>
        </div>
      )}
    </div>
  );
}

export default Matches;
