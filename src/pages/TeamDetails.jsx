import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTeam, searchPlayers } from "../services/footballApi";
import { tl, leagueNames, positionNames, countryNames } from "../utils/translations";
import "./TeamDetails.css";

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeam(id)
      .then((t) => {
        setTeam(t);
        return searchPlayers(t.strTeam);
      })
      .then(setPlayers)
      .catch(() => setError("Erro ao carregar dados do time."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="details-status">
      <div className="spinner" />
      <p>Carregando time...</p>
    </div>
  );

  if (error) return (
    <div className="details-status">
      <p className="details-error">⚠️ {error}</p>
      <Link to="/" className="details-back">← Voltar</Link>
    </div>
  );

  const fields = [
    { icon: "📅", label: "Fundado em",  value: team.intFormedYear },
    { icon: "🏟️", label: "Estádio",     value: team.strStadium },
    { icon: "🌐", label: "País",         value: tl(countryNames, team.strCountry) },
    { icon: "📍", label: "Localização", value: team.strLocation },
    { icon: "🎽", label: "Cor principal", value: team.strColour1 },
    { icon: "🌐", label: "Website",      value: team.strWebsite },
  ].filter((f) => f.value);

  return (
    <div className="page">
      <Link to="/" className="details-back">← Voltar</Link>

      <div className="details-hero">
        {team.strBadge && (
          <img src={team.strBadge} alt={team.strTeam} className="details-crest" />
        )}
        <div className="details-hero-info">
          <p className="details-area">{tl(countryNames, team.strCountry)} · {tl(leagueNames, team.strLeague)}</p>
          <h1 className="details-title">{team.strTeam}</h1>
          {team.strTeamShort && <span className="details-badge">{team.strTeamShort}</span>}
        </div>
      </div>

      {team.strDescriptionEN && (
        <p className="details-desc">{team.strDescriptionEN.slice(0, 400)}...</p>
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

      {team.strFanart1 && (
        <>
          <div className="details-section-title" style={{ marginTop: 28 }}>Galeria</div>
          <div className="fanart-grid">
            {[team.strFanart1, team.strFanart2, team.strFanart3, team.strFanart4]
              .filter(Boolean)
              .map((img, i) => (
                <img key={i} src={img} alt="fanart" className="fanart-img" />
              ))}
          </div>
        </>
      )}

      {players.length > 0 && (
        <>
          <div className="details-section-title" style={{ marginTop: 28 }}>Jogadores</div>
          <div className="squad-grid">
            {players.map((p) => (
              <div key={p.idPlayer} className="squad-card">
                {p.strThumb && (
                  <img src={p.strThumb} alt={p.strPlayer} className="squad-thumb" />
                )}
                <span className="squad-name">{p.strPlayer}</span>
                <span className="squad-pos">{tl(positionNames, p.strPosition)}</span>
                {p.strNationality && (
                  <span className="squad-nat">{p.strNationality}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TeamDetails;
