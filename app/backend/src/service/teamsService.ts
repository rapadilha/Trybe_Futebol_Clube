import { throwTeamsError } from '../middlewares/utils';
import Teams from '../database/models/teams';
import TeamsBody from '../interface/teamsInterface';

export default class TeamsService implements TeamsBody {
  constructor(private model = Teams) {}

  async getTeams(): Promise<object | string> {
    const teams = await this.model.findAll();

    if (!teams) return throwTeamsError('Teams not exist');

    const teamList = teams.map((team) => team.dataValues);

    return teamList;
  }

  async getTeamsId(id: string): Promise<object | string> {
    const team = await this.model.findOne({ where: { id } });

    if (!team) return throwTeamsError('Teams not exist');

    return team;
  }
}
