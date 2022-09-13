import awayTeamTable from '../middlewares/awayStatusLeaderBoard';
import LeaderBorardBody from '../interface/leaderboardInterface';
// import Matches from '../database/models/matches';
import homeTeamTable from '../middlewares/homeStatusLeadboard';
import fullTeamsTable from '../middlewares/fullStatusLeaderBoard';

export default class LeaderBoardService implements LeaderBorardBody {
  constructor(
    private table = homeTeamTable,
    private awayTable = awayTeamTable,
    private fullTable = fullTeamsTable,
  ) {}

  async leaderBoard(): Promise<object> {
    const matches = await this.table();
    return matches;
  }

  async leaderBoardAway(): Promise<object> {
    const matches = await this.awayTable();
    return matches;
  }

  async fullLeaderBoard() {
    const matches = await this.fullTable();
    return matches;
  }
}
