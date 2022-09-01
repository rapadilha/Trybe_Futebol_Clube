import { throwInvalidError } from '../middlewares/utils';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import MatchesBody, { CreateMatch } from '../interface/matchesInterface';

export default class MatchesService implements MatchesBody {
  constructor(private model = Matches) {}

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
}
