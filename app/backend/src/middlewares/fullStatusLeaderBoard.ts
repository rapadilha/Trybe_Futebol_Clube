import { LeadeBoard } from '../interface/leaderboardInterface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

let getTeam: Teams[];
let getMatches: Matches[];
let points: number;
let victories: number;
let draws: number;
let losses: number;
let goalsFavor: number;
let goalsOwn: number;
let goalsBalance: number;
let table: LeadeBoard[] = [];
let totalMatches: number;

const getInfoMatch = async () => {
  getTeam = await Teams.findAll();
  getMatches = await Matches.findAll({ where: { inProgress: false } });
};

const getHomeTeamById = (id: number) => {
  const match = getMatches.filter((matches) => matches.homeTeam === id);

  return match;
};

const getAwayTeamById = (id: number) => {
  const match = getMatches.filter((matches) => matches.awayTeam === id);

  return match;
};

const homePoints = (match: Matches) => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    points += 3;
    victories += 1;
  }

  if (match.homeTeamGoals === match.awayTeamGoals) {
    points += 1;
    draws += 1;
  }

  if (match.homeTeamGoals < match.awayTeamGoals) {
    losses += 1;
  }
};

const awayPoints = (match: Matches) => {
  if (match.homeTeamGoals < match.awayTeamGoals) {
    points += 3;
    victories += 1;
  }

  if (match.homeTeamGoals === match.awayTeamGoals) {
    points += 1;
    draws += 1;
  }

  if (match.homeTeamGoals > match.awayTeamGoals) {
    losses += 1;
  }
};

const tableData = (id: number) => {
  const getMatchHome = getHomeTeamById(id);
  const getMatchAway = getAwayTeamById(id);

  points = 0;
  victories = 0;
  draws = 0;
  losses = 0;
  getMatchHome.map((match) => {
    if (match.awayTeam === id) awayPoints(match);
    if (match.homeTeam === id) homePoints(match);
    return points;
  });

  getMatchAway.map((match) => {
    if (match.homeTeam === id) homePoints(match);
    if (match.awayTeam === id) awayPoints(match);
    return points;
  });

  return { points };
};

const goalsCount = (id: number) => {
  const getMatchHome = getHomeTeamById(id);
  const getMatchAway = getAwayTeamById(id);
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  getMatchHome.map((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
    goalsBalance = goalsFavor - goalsOwn;
    return goalsFavor;
  });
  getMatchAway.map((match) => {
    goalsOwn += match.homeTeamGoals;
    goalsFavor += match.awayTeamGoals;
    goalsBalance = goalsFavor - goalsOwn;
    return goalsFavor;
  });

  return { goalsFavor };
};

const victoryRate = (id: number) => {
  const getMatchHome = getHomeTeamById(id);
  const getMatchAway = getAwayTeamById(id);
  totalMatches = getMatchAway.length + getMatchHome.length;

  const teamPoints = tableData(id);
  const ratePoints = ((teamPoints.points / (totalMatches * 3)) * 100);
  const formatRate = Number(ratePoints.toFixed(2));
  return formatRate;
};

const leaderboard = () => {
  table = [];
  getTeam.map(async (team) => {
    const infoLeaderBoard = {
      name: team.teamName,
      totalPoints: tableData(team.id).points,
      totalGames: getHomeTeamById(team.id).length + getAwayTeamById(team.id).length,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor: goalsCount(team.id).goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: victoryRate(team.id),
    };

    table = [...table, infoLeaderBoard];

    return table;
  });
  return table;
};

const fullTeamsTable = async () => {
  await getInfoMatch();
  const result = leaderboard();

  result.sort((a, b) =>
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);

  return result;
};
export default fullTeamsTable;
