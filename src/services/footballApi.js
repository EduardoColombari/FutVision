import axios from "axios";

const BASE = `https://www.thesportsdb.com/api/v1/json/${import.meta.env.VITE_FOOTBALL_API_KEY}`;

const api = axios.create({ baseURL: BASE });

export const fetchLeague = async (id) => {
  const res = await api.get(`/lookupleague.php?id=${id}`);
  const l = res.data.leagues?.[0];
  if (!l) throw new Error("Liga não encontrada");
  return l;
};

export const fetchPlayer = async (id) => {
  const res = await api.get(`/lookupplayer.php?id=${id}`);
  const p = res.data.players?.[0];
  if (!p) throw new Error("Jogador não encontrado");
  return p;
};

export const fetchLeagues = async () => {
  const res = await api.get("/all_leagues.php");
  return (res.data.leagues ?? []).filter((l) => l.strSport === "Soccer");
};

export const searchTeams = async (name) => {
  const res = await api.get(`/searchteams.php?t=${encodeURIComponent(name)}`);
  return (res.data.teams ?? []).filter((t) => t.strSport === "Soccer");
};

export const fetchTeam = async (id) => {
  const res = await api.get(`/lookupteam.php?id=${id}`);
  const t = res.data.teams?.[0];
  if (!t) throw new Error("Time não encontrado");
  return t;
};

export const searchPlayers = async (teamName) => {
  const res = await api.get(`/searchplayers.php?t=${encodeURIComponent(teamName)}`);
  return res.data.player ?? [];
};

export const searchPlayersByName = async (name) => {
  const res = await api.get(`/searchplayers.php?p=${encodeURIComponent(name)}`);
  return (res.data.player ?? []).filter((p) => p.strSport === "Soccer");
};

export const fetchNextEvents = async (leagueId) => {
  const res = await api.get(`/eventsnextleague.php?id=${leagueId}`);
  return res.data.events ?? [];
};

export const fetchStandings = async (leagueId, season) => {
  const res = await api.get(`/lookuptable.php?l=${leagueId}&s=${season}`);
  return res.data.table ?? [];
};

export default api;
