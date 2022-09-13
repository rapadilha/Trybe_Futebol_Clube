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

const getInfoMatch = async () => {
  getTeam = await Teams.findAll();
  getMatches = await Matches.findAll({ where: { inProgress: false } });
};

const getMatchByTeamId = (id: number) => {
  const match = getMatches.filter((matches) => matches.awayTeam === id);

  return match;
};

// const homePoints = (match: Matches) => {
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     points += 3;
//     victories += 1;
//   }

//   if (match.homeTeamGoals === match.awayTeamGoals) {
//     points += 1;
//     draws += 1;
//   }

//   if (match.homeTeamGoals < match.awayTeamGoals) {
//     losses += 1;
//   }
// };

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
  const getMatch = getMatchByTeamId(id);

  points = 0;
  victories = 0;
  draws = 0;
  losses = 0;
  getMatch.map((match) => {
    awayPoints(match);
    return points;
  });

  return { points };
};

const goalsCount = (id: number) => {
  const getMatch = getMatchByTeamId(id);
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  getMatch.map((match) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
    goalsBalance = goalsFavor - goalsOwn;
    return goalsFavor;
  });

  return { goalsFavor };
};

const victoryRate = (id: number) => {
  const getMatch = getMatchByTeamId(id);
  const teamPoints = tableData(id);
  const ratePoints = ((teamPoints.points / (getMatch.length * 3)) * 100);
  const formatRate = Number(ratePoints.toFixed(2));
  return formatRate;
};

const leaderboard = () => {
  table = [];
  getTeam.map(async (team) => {
    const infoLeaderBoard = {
      name: team.teamName,
      totalPoints: tableData(team.id).points,
      totalGames: getMatchByTeamId(team.id).length,
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

const awayTeamTable = async () => {
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
export default awayTeamTable;
