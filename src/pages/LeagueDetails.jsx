import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLeague } from "../services/footballApi";
import { tl, countryNames } from "../utils/translations";
import "./LeagueDetails.css";

function LeagueDetails() {
  const { id } = useParams();
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeague(id)
      .then(setLeague)
      .catch(() => setError("Erro ao carregar dados da liga."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="details-status">
      <div className="spinner" />
      <p>Carregando liga...</p>
    </div>
  );

  if (error) return (
    <div className="details-status">
      <p className="details-error">⚠️ {error}</p>
      <Link to="/" className="details-back">← Voltar</Link>
    </div>
  );

  const fields = [
    { icon: "📅", label: "Fundada em",       value: league.intFormedYear },
    { icon: "🌐", label: "País",              value: tl(countryNames, league.strCountry) },
    { icon: "⚽", label: "Temporada atual",   value: league.strCurrentSeason },
    { icon: "📆", label: "Primeiro jogo",     value: league.dateFirstEvent },
    { icon: "🌐", label: "Website",           value: league.strWebsite },
  ].filter((f) => f.value);

  return (
    <div className="page">
      <Link to="/" className="details-back">← Voltar</Link>

      <div className="details-hero">
        {league.strBadge && (
          <img src={league.strBadge} alt={league.strLeague} className="details-crest" />
        )}
        <div className="details-hero-info">
          <p className="details-area">{tl(countryNames, league.strCountry)}</p>
          <h1 className="details-title">{league.strLeague}</h1>
          {league.strLeagueAlternate && (
            <span className="details-badge">{league.strLeagueAlternate.split(",")[0]}</span>
          )}
        </div>
      </div>

      {league.strDescriptionEN && (
        <p className="details-desc">{league.strDescriptionEN.slice(0, 500)}...</p>
      )}

      <div className="details-section-title">Informações</div>
      <div className="specs-grid">
        {fields.map(({ icon, label, value }) => (
          <div key={label} className="spec-card">
            <span className="spec-icon">{icon}</span>
            <span className="spec-label">{label}</span>
            <span className="spec-value">{value}</span>
          </div>
        ))}
      </div>

      {league.strTrophy && (
        <>
          <div className="details-section-title" style={{ marginTop: 28 }}>Troféu</div>
          <div className="league-trophy-wrap">
            <img src={league.strTrophy} alt="Troféu" className="league-trophy" />
          </div>
        </>
      )}

      {league.strFanart1 && (
        <>
          <div className="details-section-title" style={{ marginTop: 28 }}>Galeria</div>
          <div className="fanart-grid">
            {[league.strFanart1, league.strFanart2, league.strFanart3, league.strFanart4]
              .filter(Boolean)
              .map((img, i) => (
                <img key={i} src={img} alt="fanart" className="fanart-img" />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LeagueDetails;
