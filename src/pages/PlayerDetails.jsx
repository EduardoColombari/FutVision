import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlayer } from "../services/footballApi";
import { tl, positionNames, countryNames } from "../utils/translations";
import "./PlayerDetails.css";

function PlayerDetails() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayer(id)
      .then(setPlayer)
      .catch(() => setError("Erro ao carregar dados do jogador."))
      .finally(() => setLoading(false));
  }, [id]);

  const calcAge = (dateStr) => {
    if (!dateStr) return null;
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const statusMap = { Active: "Ativo", Retired: "Aposentado", Coaching: "Treinador" };
  const sideMap = { Left: "Canhoto", Right: "Destro", Both: "Ambidestro" };

  if (loading) return (
    <div className="details-status">
      <div className="spinner" />
      <p>Carregando jogador...</p>
    </div>
  );

  if (error) return (
    <div className="details-status">
      <p className="details-error">⚠️ {error}</p>
      <Link to="/players" className="details-back">← Voltar</Link>
    </div>
  );

  const fields = [
    { icon: "🎂", label: "Nascimento",   value: player.dateBorn ? `${formatDate(player.dateBorn)} (${calcAge(player.dateBorn)} anos)` : null },
    { icon: "📍", label: "Local",        value: player.strBirthLocation },
    { icon: "🌐", label: "Nacionalidade",value: tl(countryNames, player.strNationality) },
    { icon: "⚽", label: "Posição",      value: tl(positionNames, player.strPosition) },
    { icon: "👟", label: "Pé",           value: sideMap[player.strSide] ?? player.strSide },
    { icon: "🔢", label: "Camisa",       value: player.strNumber },
    { icon: "📏", label: "Altura",       value: player.strHeight },
    { icon: "⚖️", label: "Peso",         value: player.strWeight },
    { icon: "🏟️", label: "Time atual",   value: player.strTeam },
    { icon: "🏳️", label: "Seleção",      value: player.strTeam2 },
  ].filter((f) => f.value);

  return (
    <div className="page">
      <Link to="/players" className="details-back">← Voltar</Link>

      <div className="player-details-hero">
        <div className="player-details-img-wrap">
          {player.strCutout || player.strPoster ? (
            <img
              src={player.strCutout ?? player.strPoster}
              alt={player.strPlayer}
              className="player-details-img"
            />
          ) : (
            <div className="player-details-placeholder">⚽</div>
          )}
        </div>
        <div className="details-hero-info">
          <p className="details-area">
            {tl(countryNames, player.strNationality)} · {player.strTeam}
          </p>
          <h1 className="details-title">{player.strPlayer}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {player.strPosition && (
              <span className="details-badge">{tl(positionNames, player.strPosition)}</span>
            )}
            {player.strStatus && (
              <span className="details-badge" style={{ color: player.strStatus === "Active" ? "var(--green)" : "inherit" }}>
                {statusMap[player.strStatus] ?? player.strStatus}
              </span>
            )}
          </div>
        </div>
      </div>

      {player.strDescriptionEN && (
        <p className="details-desc">{player.strDescriptionEN.slice(0, 500)}...</p>
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

      {player.strFanart1 && (
        <>
          <div className="details-section-title" style={{ marginTop: 28 }}>Galeria</div>
          <div className="fanart-grid">
            {[player.strFanart1, player.strFanart2, player.strFanart3, player.strFanart4]
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

export default PlayerDetails;
