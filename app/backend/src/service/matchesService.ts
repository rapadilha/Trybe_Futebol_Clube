import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import MatchesBody from '../interface/matchesInterface';

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
}
