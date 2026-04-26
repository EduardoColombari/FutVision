import { Link } from "react-router-dom";
import { tl, leagueNames } from "../utils/translations";
import "./LeagueCard.css";

function LeagueCard({ league, active, onSelect }) {
  return (
    <div className={`league-card ${active ? "active" : ""}`}>
      <button className="league-card-btn" onClick={() => onSelect(league)}>
        {league.strBadge && (
          <img src={league.strBadge} alt={league.strLeague} className="league-card-badge" />
        )}
        <span>{tl(leagueNames, league.strLeague)}</span>
      </button>
      <Link to={`/league/${league.idLeague}`} className="league-card-detail" title="Ver detalhes">
        →
      </Link>
    </div>
  );
}

export default LeagueCard;
