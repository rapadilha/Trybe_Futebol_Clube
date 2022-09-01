import { throwInvalidError, throwTeamsNoExistError } from '../middlewares/utils';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import MatchesBody, { CreateMatch } from '../interface/matchesInterface';
import authService from './authService';

export default class MatchesService implements MatchesBody {
  constructor(private model = Matches, private auth = authService) {}

  async getMatches(): Promise<object | string> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] } });

    return matches;
  }

  async getInProgress(query: string | undefined): Promise< object | string> {
    const matchesTrue = await this.model.findAll({ where: { inProgress: true },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] } });

    const matchesFalse = await this.model.findAll({ where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team', 'away_team'] } });

    if (query === 'false') return matchesFalse;

    return matchesTrue;
  }

  async createMatch(body: CreateMatch): Promise<object | string> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;

    const homeExist = await Teams.findOne({ where: { id: homeTeam } });
    const awayExist = await Teams.findOne({ where: { id: awayTeam } });

    if (!homeExist || !awayExist) {
      return throwTeamsNoExistError('There is no team with such id!');
    }

    if (homeTeam === awayTeam) {
      return throwInvalidError(
        'It is not possible to create a match with two equal teams',
      );
    }
    const create = await this.model.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true });

    return create;
  }

  async finishMatch(id: string): Promise<object> {
    await this.model.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  async validateToken(auth: string): Promise<boolean | string> {
    await this.auth.decode(auth);

    return true;
  }

  async updateMatchGoals(id: string, body: CreateMatch): Promise<object> {
    const { homeTeamGoals, awayTeamGoals } = body;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { message: 'Gooool' };
  }
}
