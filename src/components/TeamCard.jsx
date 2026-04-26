import { Link } from "react-router-dom";
import { tl, leagueNames, countryNames } from "../utils/translations";
import "./TeamCard.css";

function TeamCard({ team }) {
  return (
    <Link to={`/team/${team.idTeam}`} className="team-card">
      <div className="team-card-info">
        {team.strBadge && (
          <img src={team.strBadge} alt={team.strTeam} className="team-card-crest" />
        )}
        <div className="team-card-text">
          <span className="team-card-name">{team.strTeam}</span>
          {team.strLeague && (
            <span className="team-card-league">{tl(leagueNames, team.strLeague)}</span>
          )}
        </div>
      </div>
      <div className="team-card-meta">
        {team.strCountry && <span>{tl(countryNames, team.strCountry)}</span>}
        {team.intFormedYear && <span>Fundado: {team.intFormedYear}</span>}
      </div>
    </Link>
  );
}

export default TeamCard;
