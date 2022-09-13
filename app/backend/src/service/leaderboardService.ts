import LeaderBorardBody from '../interface/leaderboardInterface';
// import Matches from '../database/models/matches';
import homeTeamTable from '../middlewares/homeStatusLeadboard';

export default class LeaderBoardService implements LeaderBorardBody {
  constructor(private table = homeTeamTable) {}

  async leaderBoard(): Promise<object> {
    const matches = await this.table();
    return matches;
  }
}
