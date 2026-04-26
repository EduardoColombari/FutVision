import { useState } from "react";
import { searchTeams } from "../services/footballApi";
import { tl, leagueNames, countryNames } from "../utils/translations";
import "./Compare.css";

const statRows = [
  { label: "Liga",        key: "strLeague",          translate: leagueNames },
  { label: "País",        key: "strCountry",         translate: countryNames },
  { label: "Fundado",     key: "intFormedYear" },
  { label: "Estádio",     key: "strStadium" },
  { label: "Capacidade",  key: "intStadiumCapacity" },
  { label: "Localização", key: "strLocation" },
];

function TeamSelector({ label, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchTeams(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (team) => {
    setSelected(team);
    setResults([]);
    onSelect(team);
  };

  const handleClear = () => {
    setSelected(null);
    setQuery("");
    setResults([]);
    onSelect(null);
  };

  return (
    <div className="compare-slot">
      <p className="compare-slot-label">{label}</p>

      {selected ? (
        <div className="compare-selected">
          {selected.strBadge && (
            <img src={selected.strBadge} alt={selected.strTeam} className="compare-selected-crest" />
          )}
          <div className="compare-selected-info">
            <h3 className="compare-selected-model">{selected.strTeam}</h3>
            <span className="compare-selected-year">{tl(leagueNames, selected.strLeague)}</span>
          </div>
          <button className="compare-clear-btn" onClick={handleClear}>Trocar</button>
        </div>
      ) : (
        <div className="compare-cascade">
          <form className="form-field" onSubmit={handleSearch}>
            <label>Buscar time</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Arsenal, Flamengo..."
              />
              <button type="submit" className="search-btn">Buscar</button>
            </div>
          </form>

          {loading && <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Carregando...</p>}

          {results.length > 0 && (
            <div className="form-field">
              <label>Selecionar</label>
              <select onChange={(e) => handleSelect(results[+e.target.value])} defaultValue="">
                <option value="" disabled>Selecione o time...</option>
                {results.map((t, i) => (
                  <option key={t.idTeam} value={i}>{t.strTeam} — {t.strLeague}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Compare() {
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  return (
    <div className="page">
      <div className="compare-header">
        <h1 className="compare-title">Comparar Times</h1>
        <p className="compare-sub">Busque dois times para comparar as informações lado a lado.</p>
      </div>

      <div className="compare-slots">
        <TeamSelector label="Time 1" onSelect={setTeam1} />
        <div className="compare-vs">VS</div>
        <TeamSelector label="Time 2" onSelect={setTeam2} />
      </div>

      {team1 && team2 && (
        <div className="compare-table-wrap">
          <div className="compare-table-header">
            <div />
            <div className="compare-table-car">
              {team1.strBadge && <img src={team1.strBadge} alt={team1.strTeam} style={{ width: 32, height: 32, objectFit: "contain" }} />}
              <strong>{team1.strTeam}</strong>
            </div>
            <div className="compare-table-car">
              {team2.strBadge && <img src={team2.strBadge} alt={team2.strTeam} style={{ width: 32, height: 32, objectFit: "contain" }} />}
              <strong>{team2.strTeam}</strong>
            </div>
          </div>

          {statRows.map(({ label, key, translate }) => (
            <div key={key} className="compare-row">
              <span className="compare-row-label">{label}</span>
              <span className="compare-row-val">{translate ? tl(translate, team1[key]) : (team1[key] ?? "—")}</span>
              <span className="compare-row-val">{translate ? tl(translate, team2[key]) : (team2[key] ?? "—")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Compare;
